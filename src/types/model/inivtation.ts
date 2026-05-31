import { TBaseModel } from "@/types/model/base-model";
import { TPicture } from "@/types/model/picture";

export type TInvitation = TBaseModel & {
	name: string;
	caption: string;
	activated: boolean;
	closed: boolean;
	declined: boolean | null;
	activeUsersCount?: number;
	expirationDate?: string | null;
	logo?: TPicture;
	recipientEmail?: string;
	recipientName?: string;
	sentAt?: string;
	sentByEmail?: string;
	sentByName?: string;
};
