import { configureStore } from "@reduxjs/toolkit";

import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import {
	useDispatch,
	TypedUseSelectorHook,
	useSelector as selectorHook,
} from "react-redux";

const { createReduxHistory, routerMiddleware, routerReducer } =
	createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
	reducer: {
		router: routerReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const history = createReduxHistory(store);
