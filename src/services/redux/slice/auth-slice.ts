import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { bonutsApi } from "../../api/bonuts-api";

import type { TAuthState } from "@/shared/model/auth";

const initialState: TAuthState = {
	token: undefined,
	tenant: undefined,
	isAuthenticated: false,
	isAuthenticating: false,
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: () => initialState,
		authenticate: (state: TAuthState, action: PayloadAction<TAuth>) => {
			state.isAuthenticated = true;
			state.isAuthenticating = false;
			state.token = action.payload.token;
			state.tenant = action.payload.tenant;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(bonutsApi.endpoints.postDemoAuthenticate.matchPending, (state) => {
				state.isAuthenticating = true;
			})
			.addMatcher(bonutsApi.endpoints.postDemoAuthenticate.matchFulfilled, (state, action) => {
				state.token = action.payload.auth_token;
				if (action.payload.tenants.length === 1) {
					state.tenant = action.payload.tenants[0]?.name || "";
				}
				state.isAuthenticated = true;
				state.isAuthenticating = false;
			})
			.addMatcher(bonutsApi.endpoints.postRefreshToken.matchFulfilled, (state, action) => {
				state.token = action.payload.auth_token;
				if (action.payload.tenants.length === 1) {
					state.tenant = action.payload.tenants[0]?.name || "";
				}
				state.isAuthenticated = true;
				state.isAuthenticating = false;
			})
			.addMatcher(bonutsApi.endpoints.postDemoAuthenticate.matchRejected, (state) => {
				state.isAuthenticated = false;
				state.isAuthenticating = false;
				state.token = undefined;
				state.tenant = undefined;
			})
			.addMatcher(bonutsApi.endpoints.postAuthenticate.matchPending, (state) => {
				state.isAuthenticating = true;
			})
			.addMatcher(bonutsApi.endpoints.postAuthenticate.matchFulfilled, (state, action) => {
				state.token = action.payload.auth_token;
				if (action.payload.tenants.length === 1) {
					state.tenant = action.payload.tenants[0]?.name || "";
				}
				state.isAuthenticated = true;
				state.isAuthenticating = false;
			})
			.addMatcher(bonutsApi.endpoints.postAuthenticate.matchRejected, (state) => {
				state.isAuthenticated = false;
				state.isAuthenticating = false;
				state.token = undefined;
				state.tenant = undefined;
			})
			.addMatcher(bonutsApi.endpoints.postLogout.matchPending, () => {
				return initialState;
			});
	},
});

export const authActions = slice.actions;
export const authReducer = slice.reducer;
