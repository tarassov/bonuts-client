import type { ReactNode } from "react";

import { BTNHeader } from "components/header/header";
import BntSidebar from "components/sidebar/sidebar";

import { useAuth } from "@/shared/model/auth";
import { BntBox } from "@/shared/ui/box";
import { BntDialogProvider } from "@/shared/ui/dialog";
import { BntDrawerHeader } from "@/shared/ui/drawer";
import { BntStack } from "@/shared/ui/stack";

import type { TModalConfig } from "@/entities/modal";
import { useProfile } from "@/entities/profile";

import { modalConfig } from "../config/modal-config";

interface IPageWrapperProps {
	children: ReactNode;
	path: string;
	addressPath: string; // could be different for dialog path's
	modalName?: keyof TModalConfig;
	modalData?: any;
	isRoot?: boolean;
}

export function PageWrapper({ children, addressPath, path, modalName, modalData, isRoot }: IPageWrapperProps) {
	const { auth } = useAuth();
	const { profile } = useProfile();
	const isVisibleNavigation = auth.isAuthenticated && !isRoot;

	return (
		<BntDialogProvider path={path} addressPath={addressPath} config={modalConfig} defaultModalData={modalData} defaultModal={modalName}>
			<>
				{isVisibleNavigation ? <BTNHeader profile={profile} /> : null}
				{isVisibleNavigation ? <BntSidebar /> : null}
				<BntBox component="main" sx={{ flexGrow: 1, maxWidth: "100%", height: "100%", overflow: "hidden" }}>
					<BntStack direction="column" sx={{ height: "100%", p: 0, m: 0, overflow: "hidden" }}>
						{isVisibleNavigation && <BntDrawerHeader />}
						<BntBox sx={{ flexGrow: 1, height: "100%", overflowY: "auto", p: 1 }}>{children}</BntBox>
					</BntStack>
				</BntBox>
			</>
		</BntDialogProvider>
	);
}
