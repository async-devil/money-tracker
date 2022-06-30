import { ApiExtraModels, ApiProperty, getSchemaPath, OmitType } from "@nestjs/swagger";

import { AccountType } from "../response/account.entity";

export class GetAccountsByPropertiesDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000", nullable: true })
	readonly owner?: string;

	/** @example "regular" */
	@ApiProperty({ example: "regular", enum: AccountType, nullable: true })
	readonly type?: AccountType;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@ApiProperty({
		example: "USD",
		description: "ISO 4217 currency code. Could be any 3-4 uppercase characters",
		nullable: true,
	})
	readonly currency?: string;
}

/** Version of get account by properties dto for controller where owner id comes from cookie */
export class GetAccountsByPropertiesTypeDto extends OmitType(GetAccountsByPropertiesDto, [
	"owner",
]) {}

@ApiExtraModels(GetAccountsByPropertiesTypeDto)
export class GetAccountsByQuery {
	@ApiProperty({
		description: "Base64url encoded json",
		example: "eyJ0eXBlIjogInJlZ3VsYXIifQ",
		oneOf: [{ type: "string" }, { $ref: getSchemaPath(GetAccountsByPropertiesTypeDto) }],
	})
	public query: string;
}
