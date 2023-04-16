import { AnyAction, Dispatch, isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

export const rtkErrorHandler: Middleware =
	<AppDispatch extends Dispatch<AnyAction>, RootState>(
		store: MiddlewareAPI<AppDispatch, RootState>
	) =>
	(next) =>
	(action) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { dispatch } = store;
		// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
		if (isRejectedWithValue(action)) {
			console.warn("We got a rejected action!");
			// eslint-disable-next-line no-console
			console.log(action);
		}

		return next(action);
	};
