import { createSlice } from "@reduxjs/toolkit";
import { bonutsApi } from "../store/bonuts-api";
import { RootState } from "../store/store";

const initialState = {
	token: null,
	isAuthenticated: false,
} as { token: string | null; isAuthenticated: boolean };

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: () => initialState,
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
					state.isAuthenticated = true;
				}
			)
			.addMatcher(
				bonutsApi.endpoints.postAuthenticate.matchRejected,
				(state, action) => {
					console.log("rejected", action);
					state.isAuthenticated = false;
				}
			);
	},
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;
