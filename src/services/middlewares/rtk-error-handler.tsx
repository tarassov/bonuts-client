import { AnyAction, Dispatch, isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { showError } from "services/notification";
import { Errors } from "constants/dictionary";
import { bonutsApi } from "services/api/bonuts-api";
import { useStorage } from "hooks/use-storage";
import i18next from "i18next";
import { authActions } from "services/redux/slice/auth-slice";

export const rtkErrorHandler: Middleware =
	<AppDispatch extends Dispatch<AnyAction>, RootState>(
		store: MiddlewareAPI<AppDispatch, RootState>
	) =>
	(next) =>
	(action) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { dispatch } = store;
		const { setValue } = useStorage();
		// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
		if (isRejectedWithValue(action)) {
			console.warn("We got a rejected action!");
			// eslint-disable-next-line no-console
			console.log(action);
			if (action?.payload?.data?.error)
				showError(
					i18next.t(action?.payload?.data?.message) ||
						i18next.t(action.payload?.data?.errorText) ||
						Errors.DATA_FETCHING_ERROR
				);
			if (action.payload.status === 401) {
				setValue<string | null>("auth_token", null);
				setValue<string | null>("tenant", null);
				dispatch(authActions.logout());
				dispatch(bonutsApi.util.resetApiState());
			}
		}

		return next(action);
	};
