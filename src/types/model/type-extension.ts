import { TLike } from "./like";

export type TCommentable = {
	commentable: boolean;
	comments_count?: number;
	comments: Array<any>;
};

export type TLikeable = {
	likeable: boolean;
	likes: Array<TLike>;
	liked: boolean;
};

export type TTitled = {
	title: string;
};
