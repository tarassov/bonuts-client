import { TLike } from "./like";
import { TComment } from "./comment";

export type TBaseModel = {
	id: number;
};

export type TCommentable = {
	commentable: boolean;
	comments_count?: number;
	comments: Array<any>;
};

export type TLikeable = {
	likeable: boolean;
	likes: Array<TLike>;
};

export type TTitled = {
	title: string;
};
