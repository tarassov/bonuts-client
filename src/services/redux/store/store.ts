import { useSelector as selectorHook, TypedUseSelectorHook, useDispatch } from "react-redux";
import { createReduxHistoryContext } from "redux-first-history";

import { createBrowserHistory } from "history";

import { reducers } from "services/redux/store/reducers";

import { emptySplitApi as api } from "../../api/empty-api";
import { rtkErrorHandler } from "../../middlewares/rtk-error-handler";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
	history: createBrowserHistory(),
});

export const createStore = () =>
	configureStore({
		reducer: {
			router: routerReducer,
			...reducers,
		},
		devTools: process.env.NODE_ENV !== "production",
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware, api.middleware, rtkErrorHandler),
	});
export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const history = createReduxHistory(store);

setupListeners(store.dispatch);
