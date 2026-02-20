export type TenantSource = {
	currentTenant?: string | null;
	tenants?: Array<{ name?: string | null } | null> | null;
};

export const resolveCurrentTenant = (source: TenantSource): string => {
	if (source.currentTenant) {
		return source.currentTenant;
	}

	if (source.tenants?.length === 1) {
		return source.tenants[0]?.name || "";
	}

	return "";
};
