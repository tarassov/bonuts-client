import { useTenantFeatureFlags } from "@/entities/tenant";

import { useGetBlackBoxStatusQuery } from "../api/black-box-api";

import { useBlackBoxTenant } from "./use-black-box-tenant";

/** Must match TenantFeatureFlag::BLACK_BOX on the backend. */
export const BLACK_BOX_FEATURE_FLAG = "black_box";

/** New answers only change the bell, so the header checks rarely and on focus. */
const STATUS_POLL_INTERVAL_MS = 5 * 60_000;

export type TBlackBoxAccess = {
	/** True until both the tenant flags and the profile's black box status are known. */
	isLoading: boolean;
	isEnabled: boolean;
	isResponder: boolean;
	hasResponders: boolean;
	hasUnread: boolean;
};

/** What the current profile may do with the black box; the API enforces the same rules. */
export const useBlackBoxAccess = (): TBlackBoxAccess => {
	const tenant = useBlackBoxTenant();
	const { featureFlags, isLoading: isFlagsLoading } = useTenantFeatureFlags();
	const isEnabled = featureFlags.includes(BLACK_BOX_FEATURE_FLAG);
	const { data, isLoading: isStatusLoading } = useGetBlackBoxStatusQuery({ tenant }, { skip: !tenant || !isEnabled, pollingInterval: STATUS_POLL_INTERVAL_MS, refetchOnFocus: true });
	const status = data?.data;

	return {
		isLoading: isFlagsLoading || isStatusLoading,
		isEnabled,
		isResponder: Boolean(status?.is_responder),
		hasResponders: Boolean(status?.has_responders),
		hasUnread: Boolean(status?.has_unread),
	};
};
