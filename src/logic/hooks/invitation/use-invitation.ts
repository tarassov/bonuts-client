import { useCallback, useMemo } from "react";

import { usePostInvitationsMutation } from "services/api/bonuts-api";
import { usePostInvitationsByIdAcceptMutation, usePostInvitationsByIdDeclineMutation } from "services/api/extended/invitations-api";
import { texts_n } from "services/localization/texts";

import { useAuth } from "@/shared/model/auth";
import { useLoader } from "@/shared/ui/loader";
import { useNotification } from "@/shared/ui/notification";

import type { TUser } from "@/types/model";
import type { TInvitation } from "@/types/model/inivtation";

const OPERATION_NAME = "invitationLogic";
export const useInvitation = (invitation?: TInvitation) => {
	const [postAccept] = usePostInvitationsByIdAcceptMutation();
	const [postDecline] = usePostInvitationsByIdDeclineMutation();
	const [postNewInvitation] = usePostInvitationsMutation();
	const { showNotification, showResponseError } = useNotification();
	const { openLoader, closeLoader } = useLoader(OPERATION_NAME);
	const { checkAuth, auth } = useAuth();
	const { tenant } = auth;

	const accept = useCallback(() => {
		if (invitation) {
			const { id } = invitation;
			openLoader();
			postAccept({ id: id.toString() })
				.unwrap()
				.then(() => checkAuth())
				.catch(showResponseError)
				.finally(() => {
					closeLoader();
				});
		}
	}, [checkAuth, closeLoader, invitation, openLoader, postAccept, showResponseError]);

	const decline = useCallback(() => {
		if (invitation) {
			const { id } = invitation;
			openLoader();
			postDecline({ id: id.toString() })
				.unwrap()
				.then(() => checkAuth())
				.catch(showResponseError)
				.finally(() => {
					closeLoader();
				});
		}
	}, [checkAuth, closeLoader, invitation, openLoader, postDecline, showResponseError]);

	const createInvitation = useCallback(
		(user: TUser, onSuccess?: VoidFunction) => {
			if (!user || !tenant || !user.email || !user.first_name || !user.last_name) return;

			openLoader();
			postNewInvitation({
				body: {
					first_name: user.first_name!,
					last_name: user.last_name!,
					email: user.email!,
					tenant,
				},
			})
				.unwrap()
				.then(() => {
					showNotification(texts_n.new_invitation_was_created);
					showNotification(texts_n.new_invitation_email_was_sent);
					onSuccess?.();
				})
				.catch(showResponseError)
				.finally(() => {
					closeLoader();
				});
		},
		[closeLoader, openLoader, postNewInvitation, showNotification, showResponseError, tenant]
	);

	return useMemo(
		() => ({
			accept,
			decline,
			createInvitation,
		}),
		[accept, createInvitation, decline]
	);
};
