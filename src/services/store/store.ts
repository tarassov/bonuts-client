import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import {
	useDispatch,
	TypedUseSelectorHook,
	useSelector as selectorHook,
} from "react-redux";
import { emptySplitApi as api } from "../api/empty-api";
import authSlice from "../redux/auth-slice";
import { rtkQueryErrorHandler } from "../middlewares/rtkQueryErrorHandler";

const { createReduxHistory, routerMiddleware, routerReducer } =
	createReduxHistoryContext({ history: createBrowserHistory() });

export const createStore = (
	options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
	configureStore({
		reducer: {
			router: routerReducer,
			[api.reducerPath]: api.reducer,
			auth: authSlice,
		},
		devTools: process.env.NODE_ENV !== "production",
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				routerMiddleware,
				api.middleware,
				rtkQueryErrorHandler
			),
		...options,
	});
export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const history = createReduxHistory(store);

setupListeners(store.dispatch);