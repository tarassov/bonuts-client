import { FC } from "react";
import { modalConfig } from "config/modal-config";
import { BntDialogProvider } from "shared/modal/dialog-provider";

export const PageWrapper: FC<{ children: JSX.Element | Array<JSX.Element>; path: string }> = ({
	children,
	path,
}) => {
	return (
		<BntDialogProvider path={path} config={modalConfig}>
			{children}
		</BntDialogProvider>
	);
};
