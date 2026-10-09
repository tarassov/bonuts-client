import type { TEvent } from "@/entities/event";

import type { TOperation } from "./operation";
import type { TProfile } from "./profile";
import type { TCommentable, TLikeable, TTitled } from "./type-extension";

export type TPost = TEvent & { profile: TProfile } & TTitled & {
		operation?: TOperation;
	} & TCommentable &
	TLikeable;
