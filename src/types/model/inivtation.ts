import { TBaseModel } from "@/types/model/base-model";
import { TPicture } from "@/types/model/picture";

export type TInvitation = TBaseModel & {
	name: string;
	caption: string;
	activated: boolean;
	closed: boolean;
	declined: boolean | null;
	logo?: TPicture;
};
