import { JWTService } from "src/services/jwt.service";

class JWTTestService extends JWTService {
	constructor(key = "secret", s = 10) {
		super(key, s);
	}
}

describe("JWTService", () => {
	let jwtService: JWTService;

	beforeEach(() => {
		jwtService = new JWTTestService();
	});

	describe("signJwt method tests", () => {
		test("should return valid jwt", async () => {
			const jwt = await jwtService.signJwt({});
			expect(jwt).toMatch(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/gi);
		});
	});

	describe("getJwtData method tests", () => {
		test("should return valid data", async () => {
			const data = { data: "data" };
			const jwt = await jwtService.signJwt(data);

			const { payload } = await jwtService.getJwtData(jwt);
			expect(payload).toHaveProperty("data", data.data);
		});

		test("should fail on fake secret", async () => {
			const fakeJwtService = new JWTTestService("fake_secret");
			const jwt = await fakeJwtService.signJwt({});

			// JWSSignatureVerificationFailed: signature verification failed
			await expect(jwtService.getJwtData(jwt)).rejects.toHaveProperty(
				"name",
				"UnauthorizedException"
			);
		});

		test("should fail on run out expiration time", async () => {
			const fakeJwtService = new JWTTestService("secret", 0);
			const jwt = await fakeJwtService.signJwt({});

			// JWTExpired: "exp" claim timestamp check failed
			await expect(jwtService.getJwtData(jwt)).rejects.toHaveProperty(
				"name",
				"UnauthorizedException"
			);
		});

		test("should fail on invalid jwt token", async () => {
			// JWSInvalid: JWS Protected Header is invalid
			await expect(jwtService.getJwtData("random.random.random")).rejects.toHaveProperty(
				"name",
				"UnauthorizedException"
			);
		});
	});

	describe("isValidJwt method tests", () => {
		test("should return true on valid jwt token", async () => {
			const jwt = await jwtService.signJwt({});

			expect(await jwtService.isValidJwt(jwt)).toBe(true);
		});

		test("should return false on invalid jwt token", async () => {
			const fakeJwtService = new JWTTestService("really_fake_secret");
			const jwt = await fakeJwtService.signJwt({});

			expect(await jwtService.isValidJwt(jwt)).toBe(false);
		});
	});
});
