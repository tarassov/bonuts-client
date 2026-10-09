import { CommonStrings } from "constants/dictionary";
import { usePostAccountOperationsShareAllMutation, usePostAccountOperationsTransferMutation, usePostAdminDepositMutation } from "services/api/bonuts-api";
import { texts_t } from "services/localization/texts/texts_t";

import { useLoader } from "@/shared/ui/loader";
import { useNotification } from "@/shared/ui/notification";

import { useProfile } from "@/entities/profile";

import { useCurrentTenant } from "logic/hooks/tenant/use-current-tenant";
import type { PostAccountOperationsShareAllApiResponse, PostAccountOperationsTransferApiResponse, PostAdminDepositApiResponse } from "@/services/api/bonuts-api";
import type { TransferProps } from "@/types/logic";
import type { TActionCallback } from "@/types/logic/action-callback";
import type { AdminDepositProps } from "@/types/logic/transfer";

const OPERATION_NAME = "transferDonuts";
export const useTransfer = () => {
	const [postTransfer] = usePostAccountOperationsTransferMutation();
	const [postShareAll] = usePostAccountOperationsShareAllMutation();
	const [postAdminDeposit] = usePostAdminDepositMutation();
	const tenant = useCurrentTenant();
	const { invalidateDistribBalance } = useProfile();
	const { showNotification } = useNotification();
	const { openLoader, closeLoader } = useLoader(OPERATION_NAME, false);

	const transferMyDonuts = (args: Omit<TransferProps, "burnOld" | "toSelfAccount" | "forAll">, options?: TActionCallback<PostAccountOperationsTransferApiResponse>) => {
		const { amount, comment, ids } = args;
		if (tenant) {
			openLoader();
			postTransfer({
				body: {
					tenant,
					amount,
					comment,
					to_profile_ids: ids || [],
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

	const shareAllDonuts = (args: Omit<AdminDepositProps, "ids">, options?: TActionCallback<PostAccountOperationsShareAllApiResponse>) => {
		const { amount, comment = CommonStrings.EMPTY_STRING, toSelfAccount } = args;
		if (tenant) {
			openLoader();
			postShareAll({
				body: {
					tenant,
					amount,
					comment,
					to_self_account: toSelfAccount,
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
	return { transferMyDonuts, shareAllDonuts, adminDeposit };
};
