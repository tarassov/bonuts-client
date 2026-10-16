import { useCallback, useMemo, useState } from "react";

import { copyText } from "@/shared/lib/clipboard";
import { useNotification } from "@/shared/ui/notification";

import { useCurrentTenant } from "@/logic/hooks/tenant/use-current-tenant";
import { bonutsApi } from "@/services/api/bonuts-api";
import { texts_i } from "@/services/localization/texts";
import { useAppDispatch } from "@/services/redux/store/store";

export const useCopyInvitationLink = (invitationId: string) => {
	const dispatch = useAppDispatch();
	const tenant = useCurrentTenant();
	const [isCopying, setIsCopying] = useState(false);
	const { showGeneralError, showNotification, showResponseError } = useNotification();

	const copyInvitationLink = useCallback(async () => {
		if (!invitationId || !tenant || isCopying) return;

		setIsCopying(true);

		const request = dispatch(
			bonutsApi.endpoints.getInvitationsByIdLink.initiate({
				id: invitationId,
				tenant,
			})
		);

		try {
			const { link } = await request.unwrap();

			try {
				await copyText(link);
				showNotification(texts_i.invitation_link_copied);
			} catch {
				showGeneralError();
			}
		} catch (error) {
			showResponseError(error);
		} finally {
			request.unsubscribe();
			setIsCopying(false);
		}
	}, [dispatch, invitationId, isCopying, showGeneralError, showNotification, showResponseError, tenant]);

	return useMemo(
		() => ({
			copyInvitationLink,
			isCopying,
		}),
		[copyInvitationLink, isCopying]
	);
};
