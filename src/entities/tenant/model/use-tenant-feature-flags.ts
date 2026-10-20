import { useMemo } from "react";

import { useTenantLoader } from "@/logic/hooks/tenant/use-tenant-loader";

/** Keys of the feature flags enabled for the current tenant (TenantSerializer#feature_flags on the backend). */
export const useTenantFeatureFlags = (): { featureFlags: Array<string>; isLoading: boolean } => {
	const { tenant, isLoading } = useTenantLoader();
	const featureFlags = useMemo(() => tenant?.feature_flags ?? [], [tenant?.feature_flags]);

	return { featureFlags, isLoading };
};
