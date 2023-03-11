import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bonutsApi } from "../api/bonuts-api";
import { RootState } from "../store/store";
import { TProfile, TUser } from "../../types/model";
import _ from "lodash";

export type TAuthState = {
	token: string | null;
	isAuthenticated: boolean;
	tenant: string | null;

	profile?: TProfile | null;
};
const initialState: TAuthState = {
	token: null,
	tenant: null,
	isAuthenticated: false,
	profile: null,
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: () => initialState,
		authenticate: (state: TAuthState, action: PayloadAction<TAuth>) => {
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.tenant = action.payload.tenant;
		},
		setProfile: (state: TAuthState, action: PayloadAction<TProfile>) => {
			if (!_.isEqual(state.profile, action.payload))
				state.profile = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				bonutsApi.endpoints.postAuthenticate.matchPending,
				(state, action) => {
					console.log("pending login", action);
				}
			)
			.addMatcher(
				bonutsApi.endpoints.postAuthenticate.matchFulfilled,
				(state, action) => {
					state.token = action.payload.auth_token;
					if (action.payload.tenants.length == 1) {
						state.tenant = action.payload.tenants[0]?.name || "";
					}
					state.isAuthenticated = true;
				}
			)
			.addMatcher(
				bonutsApi.endpoints.postAuthenticate.matchRejected,
				(state, action) => {
					console.log("rejected", action);
					state.isAuthenticated = false;
					state.token = null;
					state.tenant = null;
					state.profile = null;
				}
			);
	},
});

export const { logout, authenticate, setProfile } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;

export const authTenantSelector = (state: RootState) => state.auth.tenant;

export const authProfileSelector = (state: RootState) => state.auth.profile;
