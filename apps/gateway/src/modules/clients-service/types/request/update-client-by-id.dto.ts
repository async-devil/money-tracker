export class ClientData {
	/** @example "test@email.com" */
	readonly email?: string;

	/** @example "Password5@1" */
	readonly password?: string;
}

export class UpdateClientByIdDto {
	/** @example "54d45c35-f390-4a73-bf20-353ffffa2c42" */
	readonly id: string;

	readonly data: ClientData;
}
