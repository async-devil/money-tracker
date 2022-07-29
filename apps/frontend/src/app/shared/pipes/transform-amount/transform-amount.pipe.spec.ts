import { TransformAmountPipe } from "./transform-amount.pipe";

describe("TransformAmountPipe", () => {
	it("create an instance", () => {
		const pipe = new TransformAmountPipe();
		expect(pipe).toBeTruthy();
	});
});
