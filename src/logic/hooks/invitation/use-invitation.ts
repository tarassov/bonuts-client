import { useAuth } from "logic/hooks/auth/use-auth";
import {
	usePostInvitationsByIdAcceptMutation,
	usePostInvitationsByIdDeclineMutation,
} from "services/api/extended/invitations-api";
import { TInvitation } from "@/types/model/inivtation";

export const useInvitation = (invitation?: TInvitation) => {
	const [postAccept] = usePostInvitationsByIdAcceptMutation();
	const [postDecline] = usePostInvitationsByIdDeclineMutation();
	const { checkAuth } = useAuth();
	const accept = () => {
		if (invitation) {
			const { id } = invitation;
			postAccept({ id: id.toString() }).then(() => checkAuth());
		}
	};
	const decline = () => {
		if (invitation) {
			const { id } = invitation;
			postDecline({ id: id.toString() }).then(() => checkAuth());
		}
	};

	return { accept, decline };
};
