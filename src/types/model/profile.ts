import { TUser } from "./user";

export type TProfile = TUser & {
	position: string;
	admin: boolean;
};
