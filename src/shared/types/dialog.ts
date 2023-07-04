import { ReactNode } from "react";
import { VoidResponseFunction } from "@/types/function-types";

export enum BntDialogResponse {
	None,
	Yes,
	YesNo,
	YesNoCancel,
	Ok,
	OkCancel,
}

export type TBntModalData = Record<string, string | number | undefined | null>;

export type TModalProps = {
	close?: VoidFunction;
	setModalLoading?: VoidResponseFunction<boolean>;
};

export type TBntModal<T> = {
	renderItem: (data: TBntModal<T>, props?: TModalProps) => ReactNode | Array<ReactNode>;
	isOpen?: boolean;
	data: T;
	modalKey: string;
	reposeType?: BntDialogResponse;
	onSuccess?: (values: Record<string, any>) => void;
	onCancel?: () => void;
	hasTopMenu?: boolean;
	title?: string | ((data: T) => string);
	preventCloseOnBackDropClick?: boolean;
};

export type TBntModalItems<T> = {
	[name in keyof T]: Pick<
		TBntModal<T[name]>,
		"renderItem" | "reposeType" | "hasTopMenu" | "preventCloseOnBackDropClick" | "title"
	>;
};

export type TBntModalConfig<T> = {
	items: TBntModalItems<T>;
};
