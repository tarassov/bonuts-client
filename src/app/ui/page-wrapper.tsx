import { BntDialogProvider } from "shared/ui/dialog";

import { TModalConfig } from "@/entities/modal";

import { modalConfig } from "../config/modal-config";

interface IPageWrapperProps {
	children: JSX.Element | Array<JSX.Element>;
	path: string;
	addressPath: string; // could be different for dialog path's
	modalName?: keyof TModalConfig;
	modalData?: any;
}

export function PageWrapper({ children, addressPath, path, modalName, modalData }: IPageWrapperProps) {
	return (
		<BntDialogProvider path={path} addressPath={addressPath} config={modalConfig} defaultModalData={modalData} defaultModal={modalName}>
			{children}
		</BntDialogProvider>
	);
}
