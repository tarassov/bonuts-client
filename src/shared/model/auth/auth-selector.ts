import { RootState } from "services/redux/store/store";

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const authTenantSelector = (state: RootState) => state.auth.tenant;
