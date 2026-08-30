import { useCallback } from "react";

import { useJoinTenant } from "@/features/tenant-join";

import type { TTenant } from "@/types/model/tenant";

export const useTenant = (tenant?: TTenant) => {
	const { joinTenant: join } = useJoinTenant();
	const joinTenant = useCallback(() => {
		if (tenant) join(tenant);
	}, [join, tenant]);

	return { joinTenant };
};
