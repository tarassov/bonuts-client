import { createContext, ReactNode } from "react";

import { TDialogProps } from "shared/ui/dialog/dialog-types";
import { emptyFunction } from "utils/empty-function";

type ContextType = {
	<T extends string>(name: T, data: any, key?: string): Promise<any>;
};

// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
export const DialogContext = createContext<ContextType>(async () => {});

export const DialogNamesContext = createContext<string[]>([]);

export const DialogCloseContext = createContext<{ (key: string, name: string, result?: any): void }>(emptyFunction);

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
