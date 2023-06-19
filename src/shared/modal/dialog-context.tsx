import { modalConfig, ModalType } from "config/modal-config";
import { createContext, ReactNode } from "react";
import { TModalProps } from "shared/types/dialog";

type ModalNamesType = keyof typeof modalConfig.items;

type ContextType = {
	<T extends ModalNamesType>(name: T, data: ModalType[T], key?: string): void;
};

export const BntDialogContext = createContext<ContextType>(() => {});

export const BntDialogCloseContext = createContext<{ (key: string): void }>(() => {});
export const BntDialogValueContext = createContext<
	Array<{
		name: keyof typeof modalConfig.items;
		data: any;
		modalKey: string;
		renderItem: (d: any, props?: TModalProps) => ReactNode | Array<ReactNode>;
		hasTopMenu: boolean;
		title: string;
		preventCloseOnBackDropClick?: boolean;
	}>
>([]);
