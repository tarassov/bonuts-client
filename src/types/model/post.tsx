import { TEvent } from "./event";
import { TProfile } from "./profile";
import { TCommentable, TLikeable, TTitled } from "./type-extension";
import { TOperation } from "./operation";

export type TPost = TEvent & { profile: TProfile } & TTitled & {
		operation?: TOperation;
	} & TCommentable &
	TLikeable;
