import { useEffect } from "react";

import { usePostBlackBoxReadMarkMutation } from "../api/black-box-api";

import { useBlackBoxTenant } from "./use-black-box-tenant";

/** Opening a black box page counts as having seen every answer so far, which turns the bell off. */
export const useMarkBlackBoxSeen = (isEnabled: boolean): void => {
	const tenant = useBlackBoxTenant();
	const [markSeen] = usePostBlackBoxReadMarkMutation();

	useEffect(() => {
		if (!tenant || !isEnabled) return;

		markSeen({ tenant }).catch(() => undefined);
	}, [isEnabled, markSeen, tenant]);
};
