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
import { TransferProps } from "@/types/logic";
import { AdminDepositProps } from "@/types/logic/transfer";

export const useTransfer = () => {
	const [postOperation] = usePostAccountOperationsMutation();
	const [postAdminDeposit] = usePostAdminDepositMutation();
	const tenant = useCurrentTenant();
	const { profile } = useProfileLogic();
	const { showNotification } = useNotification();
	const transferMyDonuts = (
		args: TransferProps,
		options?: { onSuccess?: (result: PostAccountOperationsApiResponse) => void }
	) => {
		const { amount, comment, ids } = args;
		if (tenant && !args.forAll) {
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
					showNotification(texts_t.transferred);
				});
		}
	};
	const adminDeposit = (
		args: AdminDepositProps,
		options?: { onSuccess?: (result: PostAdminDepositApiResponse) => void }
	) => {
		const { amount, comment = CommonStrings.EMPTY_STRING, ids, toSelfAccount } = args;
		if (tenant) {
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
				});
		}
	};
	return { transferMyDonuts, adminDeposit };
};
