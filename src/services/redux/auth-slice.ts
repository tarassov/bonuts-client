import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bonutsApi } from "../api/bonuts-api";
import { RootState } from "../store/store";

export type TAuthState = {
	token: string | null;
	isAuthenticated: boolean;
	tenant: string | null;
};
const initialState: TAuthState = {
	token: null,
	tenant: null,
	isAuthenticated: false,
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
						state.tenant = action.payload.tenants[0].name;
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
				}
			);
	},
});

export const { logout, authenticate } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;
