import { tokenRegEx } from "src/decorators/isRefreshToken.decorator";
import { HexTokenService } from "src/services/hexToken.service";

const tenSeconds = 10;

class HexTokenTestService extends HexTokenService {
	constructor() {
		super(tenSeconds);
	}
}

describe("HexTokenService", () => {
	let hexTokenService: HexTokenService;

	beforeEach(() => {
		hexTokenService = new HexTokenTestService();
	});

	describe("getToken method tests", () => {
		test("should return valid hex token", async () => {
			const token = await hexTokenService.getToken();

			expect(token).toMatch(tokenRegEx);
		});
	});

	describe("getExpirationDate method tests", () => {
		test("should return valid expiration date", () => {
			const testDate = hexTokenService.getExpirationDate();

			expect(testDate.getTime() - tenSeconds * 1000).toBeCloseTo(Date.now(), -2);
		});
	});
});
