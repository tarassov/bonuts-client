import { ReactNode } from "react";
import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

import { VoidResponseFunction } from "@/types/function-types";

export type TDialogPaperSx = SystemStyleObject<Theme>;

export type TDialogProps<TResult = void> = {
	close: (result?: TResult) => void;
	setModalLoading?: VoidResponseFunction<boolean>;
};

// An opened modal: what the provider keeps in its state and what renderItem receives.
export type TModalRecord<TData = unknown> = {
	name: string;
	data: TData;
	modalKey: string;
	title: string;
	hasTopMenu: boolean;
	renderItem: (modal: TModalRecord<any>, props: TDialogProps<any>) => ReactNode | Array<ReactNode>;
	allowFullscreen?: boolean;
	dialogPaperSx?: TDialogPaperSx;
	isTop?: boolean;
	preventCloseOnBackDropClick?: boolean;
	// Set while the dialog plays its exit transition: closed for the app, still rendered for the animation.
	isClosing?: boolean;
};

// A modal declaration. Its payload and result types are written here once and inferred everywhere else.
export type TDialogItem<TData = void, TResult = void> = {
	renderItem: (modal: TModalRecord<TData>, props: TDialogProps<TResult>) => ReactNode | Array<ReactNode>;
	title?: string | ((data: TData) => string);
	getPath?: (data: TData) => string;
	hasTopMenu?: boolean;
	closeOnBack?: boolean;
	preventCloseOnBackDropClick?: boolean;
	allowFullscreen?: boolean;
	isTop?: boolean;
	dialogPaperSx?: TDialogPaperSx;
};

export type TDialogItems = Record<string, TDialogItem<any, any>>;

export type TDialogConfig<TItems extends Record<keyof TItems, TDialogItem<any, any>> = TDialogItems> = {
	items: TItems;
};

export type TModalPayloadOf<TItem> = TItem extends TDialogItem<infer TData, any> ? TData : never;

export type TModalResultOf<TItem> = TItem extends TDialogItem<any, infer TResult> ? TResult : never;
