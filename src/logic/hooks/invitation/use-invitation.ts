import { useAuth } from "logic/hooks/auth/use-auth";
import {
	usePostInvitationsByIdAcceptMutation,
	usePostInvitationsByIdDeclineMutation,
} from "services/api/extended/invitations-api";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { usePostInvitationsMutation } from "services/api/bonuts-api";
import { useNotification } from "services/notification";
import { texts_n } from "services/localization/texts";
import { TInvitation } from "@/types/model/inivtation";
import { TUser } from "@/types/model";

const OPERATION_NAME = "invitationLogic";
export const useInvitation = (invitation?: TInvitation) => {
	const [postAccept] = usePostInvitationsByIdAcceptMutation();
	const [postDecline] = usePostInvitationsByIdDeclineMutation();
	const [postNewInvitation] = usePostInvitationsMutation();
	const { showNotification } = useNotification();
	const { openLoader, closeLoader } = useLoader(OPERATION_NAME);
	const { checkAuth, auth } = useAuth();
	const accept = () => {
		if (invitation) {
			const { id } = invitation;
			openLoader();
			postAccept({ id: id.toString() })
				.then(() => checkAuth())
				.finally(() => {
					closeLoader();
				});
		}
	};
	const decline = () => {
		if (invitation) {
			const { id } = invitation;
			openLoader();
			postDecline({ id: id.toString() })
				.then(() => checkAuth())
				.finally(() => {
					closeLoader();
				});
		}
	};

	const create = (user: TUser, onSuccess?: VoidFunction) => {
		const { tenant } = auth;
		if (user && tenant && user?.email && user.first_name && user.last_name) {
			openLoader();
			postNewInvitation({
				body: {
					first_name: user.first_name!,
					last_name: user.last_name!,
					email: user.email!,
					tenant,
				},
			})
				.then((response) => {
					if (!("error" in response)) {
						showNotification(texts_n.new_invitation_was_created);
						showNotification(texts_n.new_invitation_email_was_sent);
						onSuccess?.();
					}
				})
				.finally(() => {
					closeLoader();
				});
		}
	};

	return { accept, decline, create };
};
