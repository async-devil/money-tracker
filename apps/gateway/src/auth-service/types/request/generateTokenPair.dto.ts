import { CreateSessionDto } from "./createSession.dto";

export class GenerateTokenPairDto {
	readonly tokenData: CreateSessionDto;

	/** @example "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521" */
	readonly refreshToken: string;
}
