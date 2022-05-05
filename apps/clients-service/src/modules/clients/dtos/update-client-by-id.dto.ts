import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsString, IsUUID, Length, ValidateNested } from "class-validator";

import { IsPassword } from "src/decorators/isPassword.decorator";

export class ClientData {
	/** @example "test@email.com" */
	@IsOptional()
	@IsString()
	@IsEmail()
	readonly email?: string;

	/** @example "Password5@1" */
	@IsOptional()
	@IsString()
	@Length(6, 20)
	@IsPassword()
	readonly password?: string;
}

export class UpdateClientByIdDto {
	/** @example "54d45c35-f390-4a73-bf20-353ffffa2c42" */
	@IsUUID()
	readonly id: string;

	@ValidateNested()
	@Type(() => ClientData)
	readonly data: ClientData;
}
