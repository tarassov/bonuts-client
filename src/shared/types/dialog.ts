import { ReactNode } from "react";

export enum BntDialogResponse {
	None,
	Yes,
	YesNo,
	YesNoCancel,
	Ok,
	OkCancel,
}

export type TBntModalData = Record<string, string | number>;

export type TBntModal = {
	renderItem: (modal: TBntModal) => ReactNode | Array<ReactNode>;
	isOpen?: boolean;
	key: string;
	data?: TBntModalData;
	text?: string | JSX.Element;
	reposeType?: BntDialogResponse;
};

export type TBntModalItems = Record<string, TBntModal>;

export type TBntModalConfig = {
	items: TBntModalItems;
};

export type TBntModalContentProps = { modal?: TBntModal };
