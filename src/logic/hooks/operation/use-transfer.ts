import {
	PostAccountOperationsApiResponse,
	PostAdminDepositApiResponse,
	usePostAccountOperationsMutation,
	usePostAdminDepositMutation,
} from "services/api/bonuts-api";
import { useCurrentTenant } from "logic/hooks/tenant/use-current-tenant";
import { useNotification } from "services/notification";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { texts_t } from "services/localization/texts/texts_t";
import { CommonStrings } from "constants/dictionary";
import { useLoader } from "shared/loader/hooks/use-loader";
import { TransferProps } from "@/types/logic";
import { AdminDepositProps } from "@/types/logic/transfer";
import { TActionCallback } from "@/types/logic/action-callback";

const OPERATION_NAME = "transferDonuts";
export const useTransfer = () => {
	const [postOperation] = usePostAccountOperationsMutation();
	const [postAdminDeposit] = usePostAdminDepositMutation();
	const tenant = useCurrentTenant();
	const { profile, invalidateDistribBalance } = useProfileLogic();
	const { showNotification } = useNotification();
	const { setLoading } = useLoader();

	const transferMyDonuts = (
		args: Omit<TransferProps, "burnOld" | "toSelfAccount" | "forAll">,
		options?: TActionCallback<PostAccountOperationsApiResponse>
	) => {
		const { amount, comment, ids } = args;
		if (tenant) {
			setLoading(OPERATION_NAME, true);
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
					setLoading(OPERATION_NAME, false);
				});
		}
	};
	const adminDeposit = (
		args: AdminDepositProps,
		options?: TActionCallback<PostAdminDepositApiResponse>
	) => {
		const { amount, comment = CommonStrings.EMPTY_STRING, ids, toSelfAccount } = args;
		if (tenant) {
			setLoading(OPERATION_NAME, true);
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
					setLoading(OPERATION_NAME, false);
				});
		}
	};
	return { transferMyDonuts, adminDeposit };
};
