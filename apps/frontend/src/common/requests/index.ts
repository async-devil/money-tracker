import axios, { AxiosError } from "axios";

import { AccountsApiRequests } from "./accounts";
import { CategoriesApiRequests } from "./categories";
import { TransactionsApiRequests } from "./transactions";

export class ApiRequests {
	public static async request<T>(url: string, method: string, data?: unknown) {
		try {
			return await axios.request<T>({
				url,
				method,
				data,
			});
		} catch (err) {
			const error = err as AxiosError;

			throw error.response?.data;
		}
	}

	public static dtoToBase64Query(dto: unknown) {
		return btoa(JSON.stringify(dto));
	}

	public static async ping() {
		return await this.request("/api/ping", "get");
	}

	public static transactions = TransactionsApiRequests;

	public static categories = CategoriesApiRequests;

	public static accounts = AccountsApiRequests;
}
