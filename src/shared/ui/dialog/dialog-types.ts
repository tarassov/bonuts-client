import { ReactNode } from "react";

import { VoidResponseFunction } from "@/types/function-types";

export enum DialogResponse {
	None,
	Yes,
	YesNo,
	YesNoCancel,
	Ok,
	OkCancel,
}

export type TDialogProps = {
	close?: VoidFunction;
	setModalLoading?: VoidResponseFunction<boolean>;
};

export type TDialog<T> = {
	renderItem: (data: TDialog<T>, props?: TDialogProps) => ReactNode | Array<ReactNode>;
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
};

export type TDialogItems<T> = {
	[name in keyof T]: Pick<
		TDialog<T[name]>,
		"renderItem" | "reposeType" | "hasTopMenu" | "preventCloseOnBackDropClick" | "title" | "getPath" | "isTop"
	>;
};

export type TDialogConfig<T> = {
	items: TDialogItems<T>;
};
