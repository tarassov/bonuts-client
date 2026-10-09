import { present } from "@/shared/lib/type-guards";
import type { TAuthState } from "@/shared/model/auth";
import { resolveCurrentTenant } from "@/shared/model/auth";

import { bonutsApi } from "../../api/bonuts-api";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TAuthState = {
	token: undefined,
	tenant: undefined,
	isAuthenticated: false,
	isAuthenticating: false,
	isTenantAuthenticated: false,
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
			state.isTenantAuthenticated = present(action.payload.tenant);
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(bonutsApi.endpoints.postDemoAuthenticate.matchPending, (state) => {
				state.isAuthenticating = true;
			})
			.addMatcher(bonutsApi.endpoints.postDemoAuthenticate.matchFulfilled, (state, action) => {
				const tenant = resolveCurrentTenant(action.payload);
				state.token = action.payload.auth_token;
				state.tenant = tenant;
				state.isAuthenticated = true;
				state.isAuthenticating = false;
				state.isTenantAuthenticated = present(tenant);
			})
			.addMatcher(bonutsApi.endpoints.postRefreshToken.matchFulfilled, (state, action) => {
				const tenant = resolveCurrentTenant(action.payload);
				state.token = action.payload.auth_token;
				state.tenant = tenant;
				state.isAuthenticated = true;
				state.isAuthenticating = false;
				state.isTenantAuthenticated = present(tenant);
			})
			.addMatcher(bonutsApi.endpoints.postDemoAuthenticate.matchRejected, (state) => {
				state.isAuthenticated = false;
				state.isAuthenticating = false;
				state.token = undefined;
				state.tenant = undefined;
				state.isTenantAuthenticated = false;
			})
			.addMatcher(bonutsApi.endpoints.postAuthenticate.matchPending, (state) => {
				state.isAuthenticating = true;
			})
			.addMatcher(bonutsApi.endpoints.postAuthenticate.matchFulfilled, (state, action) => {
				const tenant = resolveCurrentTenant(action.payload);
				state.token = action.payload.auth_token;
				state.tenant = tenant;
				state.isAuthenticated = true;
				state.isAuthenticating = false;
				state.isTenantAuthenticated = present(tenant);
			})
			.addMatcher(bonutsApi.endpoints.postAuthenticate.matchRejected, (state) => {
				state.isAuthenticated = false;
				state.isAuthenticating = false;
				state.token = undefined;
				state.tenant = undefined;
				state.isTenantAuthenticated = false;
			})
			.addMatcher(bonutsApi.endpoints.postVkLogin.matchPending, (state) => {
				state.isAuthenticating = true;
			})
			.addMatcher(bonutsApi.endpoints.postVkLogin.matchFulfilled, (state, action) => {
				const tenant = resolveCurrentTenant(action.payload);
				state.token = action.payload.auth_token;
				state.tenant = tenant;
				state.isAuthenticated = true;
				state.isAuthenticating = false;
				state.isTenantAuthenticated = present(tenant);
			})
			.addMatcher(bonutsApi.endpoints.postVkLogin.matchRejected, (state) => {
				state.isAuthenticated = false;
				state.isAuthenticating = false;
				state.token = undefined;
				state.tenant = undefined;
				state.isTenantAuthenticated = false;
			})
			.addMatcher(bonutsApi.endpoints.postLogout.matchPending, () => {
				return initialState;
			});
	},
});

export const authActions = slice.actions;
export const authReducer = slice.reducer;
