import { isAdmin } from "@/shared/lib/user";
import { useCurrentProfile } from "@/shared/model/auth";

import { useTenantLoader } from "@/logic/hooks/tenant/use-tenant-loader";

/** Must match TenantFeatureFlag::HR_SUMMARY_AI on the backend. */
export const HR_CHAT_FEATURE_FLAG = "hr_summary_ai";

/** The chat entry points are shown only to admins of a tenant where the flag is on; the API enforces the same rule. */
export const useHrChatAccess = () => {
	const { profile } = useCurrentProfile();
	const { tenant } = useTenantLoader();
	const isFlagEnabled = Boolean(tenant?.feature_flags?.includes(HR_CHAT_FEATURE_FLAG));

	return { isAvailable: isAdmin(profile) && isFlagEnabled };
};
