import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { TAuthState } from "services/redux/types/auth-state";
import { bonutsApi } from "../../api/bonuts-api";
import { TProfile } from "@/types/model";

const initialState: TAuthState = {
	token: undefined,
	tenant: undefined,
	isAuthenticated: false,
	isAuthenticating: false,
	profile: undefined,
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
		setProfile: (state: TAuthState, action: PayloadAction<TProfile>) => {
			if (!_.isEqual(state.profile, action.payload)) state.profile = action.payload;
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
			.addMatcher(bonutsApi.endpoints.postDemoAuthenticate.matchRejected, (state) => {
				state.isAuthenticated = false;
				state.isAuthenticating = false;
				state.token = undefined;
				state.tenant = undefined;
				state.profile = undefined;
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
				state.profile = undefined;
			})
			.addMatcher(bonutsApi.endpoints.postLogout.matchPending, () => {
				return initialState;
			});
	},
});

export const authActions = slice.actions;
export const authReducer = slice.reducer;
