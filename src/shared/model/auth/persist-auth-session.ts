import { storage } from "@/shared/lib/localStorage";

import { resolveCurrentTenant } from "./resolve-current-tenant";

type TAuthPayload = {
	auth_token: string;
	currentTenant?: string | null;
	tenants: Array<{ name?: string | null }>;
};

export function persistAuthSession(payload: TAuthPayload) {
	const { setValue } = storage;

	setValue<string>("auth_token", payload.auth_token);
	setValue<string>("tenant", resolveCurrentTenant(payload));
}
