import { useCallback, useMemo } from "react";
import { push } from "redux-first-history";

import { usePostInvitationsMutation } from "services/api/bonuts-api";
import { usePostInvitationsByIdAcceptMutation, usePostInvitationsByIdDeclineMutation } from "services/api/extended/invitations-api";
import { texts_n } from "services/localization/texts";

import { BntRoutes } from "@/shared/config/routes";
import { useAuth } from "@/shared/model/auth";
import { useLoader } from "@/shared/ui/loader";
import { useNotification } from "@/shared/ui/notification";

import { routesPath } from "@/routes/config/routes-path";
import { useAppDispatch } from "@/services/redux/store/store";
import type { TUser } from "@/types/model";
import type { TInvitation } from "@/types/model/inivtation";

const OPERATION_NAME = "invitationLogic";
export const useInvitation = (invitation?: TInvitation) => {
	const dispatch = useAppDispatch();
	const [postAccept] = usePostInvitationsByIdAcceptMutation();
	const [postDecline] = usePostInvitationsByIdDeclineMutation();
	const [postNewInvitation] = usePostInvitationsMutation();
	const { showNotification, showResponseError } = useNotification();
	const { openLoader, closeLoader } = useLoader(OPERATION_NAME);
	const { checkAuth, auth, setTenant } = useAuth();
	const { tenant } = auth;

	const accept = useCallback(() => {
		if (invitation) {
			const { id } = invitation;
			openLoader();
			postAccept({ id: id.toString() })
				.unwrap()
				.then(async () => {
					await setTenant(invitation.name);
					dispatch(push(routesPath[BntRoutes.Dashboard]));
				})
				.catch(showResponseError)
				.finally(() => {
					closeLoader();
				});
		}
	}, [closeLoader, dispatch, invitation, openLoader, postAccept, setTenant, showResponseError]);

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
