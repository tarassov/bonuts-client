import { TEvent } from "./event";
import { TProfile } from "./profile";
import { TCommentable, TLikeable, TTitled } from "./type-extension";

export type TPost = TEvent & { profile: TProfile } & TTitled &
	TCommentable &
	TLikeable;
