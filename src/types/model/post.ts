import { TEvent } from "./event";
import { TOperation } from "./operation";
import { TProfile } from "./profile";
import { TCommentable, TLikeable, TTitled } from "./type-extension";

export type TPost = TEvent & { profile: TProfile } & TTitled & {
		operation?: TOperation;
	} & TCommentable &
	TLikeable;
