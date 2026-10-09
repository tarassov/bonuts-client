import type { TInvitation } from "@/types/model/inivtation";

type TWelcomeUser = {
	email?: string;
	firstName?: string;
	lastName?: string;
	name?: string;
};

export type TWelcomeUserIdentity = {
	email: string;
	initials: string;
	name: string;
};

export const getInvitationLogoUrl = (invitation: TInvitation): string | undefined => {
	return invitation.logo?.thumb?.url || invitation.logo?.url || undefined;
};

const getInitials = (source: string): string => {
	return source
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0])
		.join("")
		.toUpperCase();
};

export const getWelcomeUserIdentity = (user: TWelcomeUser | undefined, invitations: Array<TInvitation>): TWelcomeUserIdentity => {
	const invitation = invitations[0];
	const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
	const email = user?.email || invitation?.recipientEmail || "";
	const name = fullName || user?.name || invitation?.recipientName || email;

	return {
		email,
		initials: getInitials(name || email || "B"),
		name,
	};
};

export const getWelcomeInvitationPreview = (invitations: Array<TInvitation>): Array<TInvitation> => {
	return invitations.slice(0, 2);
};
