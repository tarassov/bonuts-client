import { RootState } from "services/redux/store/store";

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const authTenantSelector = (state: RootState) => state.auth.tenant;

// Authenticated and with a tenant, which is what any tenant scoped request needs.
export const selectIsTenantAuthenticated = (state: RootState) => Boolean(state.auth.isTenantAuthenticated);
