import type { TInvitation } from "@/types/model/inivtation";

export const getInvitationLogoUrl = (invitation: TInvitation): string | undefined => {
	return invitation.logo?.thumb?.url || invitation.logo?.url || undefined;
};

export const getWelcomeUserName = (invitations: Array<TInvitation>): string => {
	return invitations[0]?.recipientName || invitations[0]?.recipientEmail || "Bonuts";
};

export const getWelcomeUserInitials = (invitations: Array<TInvitation>): string => {
	const source = invitations[0]?.recipientName || invitations[0]?.recipientEmail || "B";

	return source
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0])
		.join("")
		.toUpperCase();
};

export const getWelcomeUserEmail = (invitations: Array<TInvitation>): string => {
	return invitations[0]?.recipientEmail || "mail@example.com";
};

export const getWelcomeInvitationPreview = (invitations: Array<TInvitation>): Array<TInvitation> => {
	return invitations.slice(0, 2);
};
