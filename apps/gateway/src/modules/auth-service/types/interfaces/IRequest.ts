/* eslint-disable import/no-extraneous-dependencies */
import { Request } from "express";

/**
 * Request modified with client id
 */
export interface IRequest extends Request {
	/** @example "54d45c35-f390-4a73-bf20-353ffffa2c42" */
	clientId: string;
}
