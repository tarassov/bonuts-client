import { createContext, ReactNode } from "react";
import { TDialogProps } from "shared/ui/dialog/dialog-types";

type ContextType = {
	<T extends string>(name: T, data: any, key?: string): Promise<any>;
};

export const DialogContext = createContext<ContextType>(async () => {});

export const DialogNamesContext = createContext<string[]>([]);

export const DialogCloseContext = createContext<{ (key: string, name: string, result?: any): void }>(() => {});

export const DialogValueContext = createContext<
	Array<{
		name: string;
		data: any;
		modalKey: string;
		hasTopMenu: boolean;
		title: string;
		preventCloseOnBackDropClick?: boolean;
		isTop?: boolean;

		renderItem: (d: any, props: TDialogProps<any>) => ReactNode | Array<ReactNode>;
	}>
>([]);
