import i18next from "i18next";

import { Errors } from "constants/dictionary";
import { bonutsApi } from "services/api/bonuts-api";
import { authActions } from "services/redux/slice/auth-slice";

import { storage } from "@/shared/lib/localStorage";
import { getResponseErrorMessage } from "@/shared/lib/notification";
import { showError } from "@/shared/ui/notification";

import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";

/** Endpoints where a failure means "no data yet", not an error — the user should not see a notification. */
const SILENT_ERROR_ENDPOINTS: ReadonlySet<string> = new Set(["getWeeklyRecognitionBadgesLatest"]);

const getEndpointName = (action: unknown) => {
	const meta = (action as { meta?: { arg?: { endpointName?: unknown } } })?.meta;

	return typeof meta?.arg?.endpointName === "string" ? meta.arg.endpointName : null;
};

const isSilentError = (action: unknown) => {
	const endpointName = getEndpointName(action);

	return !!endpointName && SILENT_ERROR_ENDPOINTS.has(endpointName);
};

export const rtkErrorHandler: Middleware = (api) => (next) => (action) => {
	const { dispatch } = api;
	const { setValue } = storage;
	if (isRejectedWithValue(action)) {
		if (!action.payload || typeof action.payload !== "object") return next(action);

		if (!isSilentError(action)) {
			const errorMessage = getResponseErrorMessage(action.payload);

			showError(errorMessage ? i18next.t(errorMessage) : Errors.DATA_FETCHING_ERROR);
		}

		if ("status" in action.payload && action.payload.status === 401) {
			setValue<string | null>("auth_token", null);
			setValue<string | null>("tenant", null);
			dispatch(authActions.logout());
			dispatch(bonutsApi.util.resetApiState());
		}
	}

	return next(action);
};
