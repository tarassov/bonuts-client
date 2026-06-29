import { ReactNode } from "react";
import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

import { VoidResponseFunction } from "@/types/function-types";

export enum DialogResponse {
	None,
	Yes,
	YesNo,
	YesNoCancel,
	Ok,
	OkCancel,
}

export type TDialogProps<TResult = any> = {
	close: (result?: TResult) => void;
	setModalLoading?: VoidResponseFunction<boolean>;
};

export type TDialog<T = any, TResult = any> = {
	renderItem: (data: TDialog<T, TResult>, props: TDialogProps<TResult>) => ReactNode | Array<ReactNode>;
	isOpen?: boolean;
	data: T;
	modalKey: string;
	reposeType?: DialogResponse;
	onSuccess?: (values: Record<string, any>) => void;
	onCancel?: () => void;
	hasTopMenu?: boolean;
	title?: string | ((data: T) => string);
	preventCloseOnBackDropClick?: boolean;
	allowFullscreen?: boolean;
	getPath?: (data: T) => string;
	isTop?: boolean;
	dialogPaperSx?: SystemStyleObject<Theme>;
};

export type TDialogItems<T, R extends Record<keyof T, any> = any> = {
	[name in keyof T]: Pick<TDialog<T[name], R[name]>, "renderItem" | "reposeType" | "hasTopMenu" | "preventCloseOnBackDropClick" | "title" | "getPath" | "isTop" | "dialogPaperSx" | "allowFullscreen">;
};

export type TDialogConfig<T, R extends Record<keyof T, any> = any> = {
	items: TDialogItems<T, R>;
};
