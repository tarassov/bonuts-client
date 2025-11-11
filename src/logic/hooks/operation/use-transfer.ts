import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { CommonStrings } from "constants/dictionary";

import {
	PostAccountOperationsApiResponse,
	PostAdminDepositApiResponse,
	usePostAccountOperationsMutation,
	usePostAdminDepositMutation,
} from "services/api/bonuts-api";
import { texts_t } from "services/localization/texts/texts_t";
import { useNotification } from "services/notification";

import { useCurrentTenant } from "logic/hooks/tenant/use-current-tenant";

import { useProfile } from "@/entities/profile";
import { TransferProps } from "@/types/logic";
import { TActionCallback } from "@/types/logic/action-callback";
import { AdminDepositProps } from "@/types/logic/transfer";

const OPERATION_NAME = "transferDonuts";
export const useTransfer = () => {
	const [postOperation] = usePostAccountOperationsMutation();
	const [postAdminDeposit] = usePostAdminDepositMutation();
	const tenant = useCurrentTenant();
	const { profile, invalidateDistribBalance } = useProfile();
	const { showNotification } = useNotification();
	const { openLoader, closeLoader } = useLoader(OPERATION_NAME, false);

	const transferMyDonuts = (
		args: Omit<TransferProps, "burnOld" | "toSelfAccount" | "forAll">,
		options?: TActionCallback<PostAccountOperationsApiResponse>
	) => {
		const { amount, comment, ids } = args;
		if (tenant) {
			openLoader();
			postOperation({
				body: {
					tenant,
					amount,
					from_profile_id: profile?.id,
					comment,
					burn_old: false,
					to_self_account: true,
					to_profile_ids: ids || [],
					share_for_all: false,
				},
			})
				.unwrap()
				.then((result) => {
					options?.onSuccess?.(result);
					invalidateDistribBalance();
					showNotification(texts_t.transferred);
				})
				.catch((e) => options?.onError?.(e.data.message))
				.finally(() => {
					closeLoader();
				});
		}
	};
	const adminDeposit = (args: AdminDepositProps, options?: TActionCallback<PostAdminDepositApiResponse>) => {
		const { amount, comment = CommonStrings.EMPTY_STRING, ids, toSelfAccount } = args;
		if (tenant) {
			openLoader();
			postAdminDeposit({
				body: {
					tenant,
					amount,
					comment,
					to_profile_ids: ids || [],
					account_type: toSelfAccount ? "self" : "distrib",
				},
			})
				.unwrap()
				.then((result) => {
					options?.onSuccess?.(result);
					showNotification(texts_t.transferred);
				})
				.finally(() => {
					closeLoader();
				});
		}
	};
	return { transferMyDonuts, adminDeposit };
};
