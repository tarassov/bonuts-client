import { FC } from "react";
import { modalConfig, ModalType } from "config/modal-config";
import { BntDialogProvider } from "shared/ui/modal/dialog-provider";

export const PageWrapper: FC<{
	children: JSX.Element | Array<JSX.Element>;
	path: string;
	addressPath: string; // could be different for modal path's
	modalName?: keyof ModalType;
	modalData?: any;
}> = ({ children, addressPath, path, modalName, modalData }) => {
	return (
		<BntDialogProvider
			path={path}
			addressPath={addressPath}
			config={modalConfig}
			defaultModalData={modalData}
			defaultModal={modalName}
		>
			{children}
		</BntDialogProvider>
	);
};
