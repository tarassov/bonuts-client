import { ReactNode } from "react";

export enum BntDialogResponse {
	None,
	Yes,
	YesNo,
	YesNoCancel,
	Ok,
	OkCancel,
}

export type TBntModalData = Record<string, string | number | undefined | null>;

export type TBntModal<T> = {
	renderItem: (data: TBntModal<T>) => ReactNode | Array<ReactNode>;
	isOpen?: boolean;
	data: T;
	modalKey: string;
	reposeType?: BntDialogResponse;
	onSuccess?: (values: Record<string, any>) => void;
	onCancel?: () => void;
	hasTopMenu?: boolean;
	preventCloseOnBackDropClick?: boolean;
};

export type TBntModalItems<T> = {
	[name in keyof T]: Pick<
		TBntModal<T[name]>,
		"renderItem" | "reposeType" | "hasTopMenu" | "preventCloseOnBackDropClick"
	>;
};

export type TBntModalConfig<T> = {
	items: TBntModalItems<T>;
};
