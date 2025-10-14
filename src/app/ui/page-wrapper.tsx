import { BntDialogProvider } from "shared/ui/modal";

import { modalConfig, TModalConfig } from "../config/modal-config";

interface IPageWrapperProps {
	children: JSX.Element | Array<JSX.Element>;
	path: string;
	addressPath: string; // could be different for modal path's
	modalName?: keyof TModalConfig;
	modalData?: any;
}

export function PageWrapper({ children, addressPath, path, modalName, modalData }: IPageWrapperProps) {
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
}
