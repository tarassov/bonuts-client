import { useCallback } from "react";

import { useNotification } from "@/shared/ui/notification";

import { useProfile } from "@/entities/profile";

import { canPurchaseDonut } from "./donut-purchase";
import { useAccountBalanceLoader } from "@/logic/hooks/account/use-account-balance-loader";
import { usePostRequestsMutation } from "@/services/api/extended/requests-api";
import { texts_r } from "@/services/localization/texts";
import type { TDonut } from "@/types/model";

export function useDonutPurchase() {
	const { authTenant, invalidateSelfBalance, profile } = useProfile();
	const { account, isLoading: isBalanceLoading } = useAccountBalanceLoader(profile?.self_account?.id);
	const [postRequest, { isLoading: isPurchasing }] = usePostRequestsMutation();
	const { showNotification } = useNotification();

	const canPurchase = useCallback((donut: TDonut) => !isBalanceLoading && canPurchaseDonut(donut, account?.balance), [account?.balance, isBalanceLoading]);

	const purchaseDonut = useCallback(
		async (donut: TDonut): Promise<boolean> => {
			if (!authTenant || isPurchasing || !canPurchase(donut)) return false;

			const result = await postRequest({ body: { donut_id: donut.id, tenant: authTenant } });
			if (result.error) return false;

			invalidateSelfBalance();
			showNotification(texts_r.request_added);

			return true;
		},
		[authTenant, canPurchase, invalidateSelfBalance, isPurchasing, postRequest, showNotification]
	);

	return { canPurchase, isPurchasing, purchaseDonut };
}
