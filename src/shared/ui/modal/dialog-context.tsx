import { createContext, ReactNode } from "react";
import { TModalProps } from "shared/ui/types/dialog-types";

import { modalConfig, TModalConfig } from "@/app/config/modal-config";

type ModalNamesType = keyof typeof modalConfig.items;

type ContextType = {
	<T extends ModalNamesType>(name: T, data: TModalConfig[T], key?: string): void;
};

export const BntDialogContext = createContext<ContextType>(() => {});

export const BntDialogCloseContext = createContext<{ (key: string, name: string): void }>(() => {});
export const BntDialogValueContext = createContext<
	Array<{
		name: keyof typeof modalConfig.items;
		data: any;
		modalKey: string;
		renderItem: (d: any, props?: TModalProps) => ReactNode | Array<ReactNode>;
		hasTopMenu: boolean;
		title: string;
		preventCloseOnBackDropClick?: boolean;
		isTop?: boolean;
	}>
>([]);
