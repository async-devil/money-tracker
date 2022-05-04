/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientProxy } from "@nestjs/microservices";
import { TestingModule, Test } from "@nestjs/testing";
import { Observable } from "rxjs";

import { RpcException } from "src/common/HttpException";
import { RequestService } from "src/common/request.service";

describe("Request service", () => {
	let service: RequestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RequestService],
		}).compile();

		service = module.get<RequestService>(RequestService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("sendRequest method tests", () => {
		test("should return value recieved from valid client proxy", async () => {
			const proxy = {
				send: (pattern: unknown, data: unknown) =>
					new Observable((sub) => {
						setTimeout(() => sub.next("data"), 1);
					}),
			};

			const result = await service.sendRequest(proxy as ClientProxy, "test", "test");

			expect(result).toBe("data");
		});

		test("should throw HttpException delivered from client proxy", async () => {
			const error: RpcException = {
				error: {
					statusCode: 400,
					message: "Test message",
					error: "Error",
				},
			};

			const proxy = {
				send: (pattern: unknown, data: unknown) =>
					new Observable((sub) => {
						setTimeout(() => sub.next(error), 1);
					}),
			};

			await expect(
				service.sendRequest(proxy as ClientProxy, "test", "test")
			).rejects.toHaveProperty("name", "HttpException");
		});
	});

	test("should throw GatewayTimeoutException when client proxy reaches timout", async () => {
		const proxy = {
			send: (pattern: unknown, data: unknown) =>
				new Observable((sub) => {
					setTimeout(() => sub.next("data"), 2);
				}),
		};

		await expect(
			service.sendRequest(proxy as ClientProxy, "test", "test", 1)
		).rejects.toHaveProperty("name", "GatewayTimeoutException");
	});

	test("should throw BadGatewayException on unknow error in client proxy or request function", async () => {
		const proxy = {
			send: (pattern: unknown, data: unknown) =>
				new Observable((sub) => {
					setTimeout(() => sub.error(new Error()), 1);
				}),
		};

		await expect(service.sendRequest(proxy as ClientProxy, "test", "test")).rejects.toHaveProperty(
			"name",
			"BadGatewayException"
		);
	});
});
