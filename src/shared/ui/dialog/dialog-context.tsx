import { createContext, ReactNode } from "react";
import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

import { emptyFunction } from "utils/empty-function";

import { TDialogProps } from "./dialog-types";

type ContextType = {
	<T extends string>(name: T, data: any, key?: string): Promise<any>;
};

// biome-ignore lint/suspicious/noEmptyBlockStatements: context default
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
		closeOnBack?: boolean;
		path?: string | null;
		preventCloseOnBackDropClick?: boolean;
		allowFullscreen?: boolean;
		isTop?: boolean;
		dialogPaperSx?: SystemStyleObject<Theme>;

		renderItem: (d: any, props: TDialogProps<any>) => ReactNode | Array<ReactNode>;
	}>
>([]);
