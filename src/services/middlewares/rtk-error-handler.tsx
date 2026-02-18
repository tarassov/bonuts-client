import i18next from "i18next";

import { Errors } from "constants/dictionary";
import { bonutsApi } from "services/api/bonuts-api";
import { showError } from "services/notification";
import { authActions } from "services/redux/slice/auth-slice";
import { storage } from "shared/lib/localStorage/storage";

import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";

export const rtkErrorHandler: Middleware = (api) => (next) => (action) => {
	const { dispatch } = api;
	const { setValue } = storage;
	if (isRejectedWithValue(action)) {
		console.warn("We got a rejected action!");
		// eslint-disable-next-line no-console
		console.log(action);

		if (!action.payload || typeof action.payload !== "object") return next(action);

		const data = "data" in action.payload && typeof action.payload.data === "object" ? action.payload.data : null;
		const error = "error" in action.payload && typeof action.payload.error === "object" ? action.payload.error : null;
		const message = error && "message" in error ? (error.message as string) : null;
		const errorText = data && "errorText" in data ? (data.errorText as string) : null;

		const errorMessage = message || errorText;

		if (errorMessage || error) showError(errorMessage ? i18next.t(errorMessage) : Errors.DATA_FETCHING_ERROR);

		if ("status" in action.payload && action.payload.status === 401) {
			setValue<string | null>("auth_token", null);
			setValue<string | null>("tenant", null);
			dispatch(authActions.logout());
			dispatch(bonutsApi.util.resetApiState());
		}
	}

	return next(action);
};
