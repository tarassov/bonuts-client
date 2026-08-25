import { useCallback, useEffect, useRef, useState } from "react";

import { useNotification } from "@/shared/ui/notification";

import { useProfile } from "@/entities/profile";

import { canPurchaseDonut } from "./donut-purchase";
import { useAccountBalanceLoader } from "@/logic/hooks/account/use-account-balance-loader";
import { usePostRequestsMutation } from "@/services/api/extended/requests-api";
import { texts_r } from "@/services/localization/texts";
import type { TDonut } from "@/types/model";

const PURCHASE_CONFIRMATION_DURATION_MS = 1300;

export function useDonutPurchase() {
	const { authTenant, invalidateSelfBalance, profile } = useProfile();
	const { account, isLoading: isBalanceLoading } = useAccountBalanceLoader(profile?.self_account?.id);
	const [postRequest, { isLoading: isPurchasing }] = usePostRequestsMutation();
	const { showNotification } = useNotification();
	const [confirmedDonutId, setConfirmedDonutId] = useState<number>();
	const confirmationTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	useEffect(() => {
		return () => {
			if (confirmationTimeoutRef.current) clearTimeout(confirmationTimeoutRef.current);
		};
	}, []);

	const canPurchase = useCallback((donut: TDonut) => !isBalanceLoading && canPurchaseDonut(donut, account?.balance), [account?.balance, isBalanceLoading]);

	const purchaseDonut = useCallback(
		async (donut: TDonut) => {
			if (!authTenant || isPurchasing || !canPurchase(donut)) return;

			const result = await postRequest({ body: { donut_id: donut.id, tenant: authTenant } });
			if (result.error) return;

			invalidateSelfBalance();
			showNotification(texts_r.request_added);
			setConfirmedDonutId(donut.id);

			if (confirmationTimeoutRef.current) clearTimeout(confirmationTimeoutRef.current);
			confirmationTimeoutRef.current = setTimeout(() => setConfirmedDonutId(undefined), PURCHASE_CONFIRMATION_DURATION_MS);
		},
		[authTenant, canPurchase, invalidateSelfBalance, isPurchasing, postRequest, showNotification]
	);

	return { canPurchase, confirmedDonutId, isPurchasing, purchaseDonut };
}
