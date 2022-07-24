import { createAction } from "@reduxjs/toolkit";

import { HttpException } from "src/common/requests/types/HttpException";

export enum MiscActionsEnum {
	SET_ERROR = "SET_ERROR",
	REMOVE_ERROR = "REMOVE_ERROR",

	ADD_LOADING = "ADD_LOADING",
	REMOVE_LOADING = "REMOVE_LOADING",
}

export type LoadingType = {
	id: number;
	action?: string;
};

export const miscActions = {
	setError: createAction<HttpException>(MiscActionsEnum.SET_ERROR),
	removeError: createAction(MiscActionsEnum.REMOVE_ERROR),

	addLoading: createAction<LoadingType>(MiscActionsEnum.ADD_LOADING),
	removeLoading: createAction<number>(MiscActionsEnum.REMOVE_LOADING),
};
