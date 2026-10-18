import type { ReactNode } from "react";

import { useAuth } from "@/shared/model/auth";
import { BntBox } from "@/shared/ui/box";
import { BntDrawerHeader } from "@/shared/ui/drawer";
import { BntStack } from "@/shared/ui/stack";

import { useProfile } from "@/entities/profile";

import { AppHeaderWidget } from "@/widgets/header";

import BntSidebar from "@/components/sidebar/sidebar";

interface IPageWrapperProps {
	children: ReactNode;
	isRoot?: boolean;
}

export function PageWrapper({ children, isRoot }: IPageWrapperProps) {
	const { auth } = useAuth();
	const { profile } = useProfile();
	const isVisibleNavigation = auth.isAuthenticated && !isRoot;

	return (
		<>
			{isVisibleNavigation ? <AppHeaderWidget profile={profile} /> : null}
			{isVisibleNavigation ? <BntSidebar /> : null}
			<BntBox component="main" sx={{ flexGrow: 1, maxWidth: "100%", height: "100%", overflow: "hidden" }}>
				<BntStack direction="column" sx={{ height: "100%", p: 0, m: 0, overflow: "hidden" }}>
					{isVisibleNavigation && <BntDrawerHeader />}
					<BntBox sx={{ flexGrow: 1, height: "100%", overflowY: "auto", p: 1 }}>{children}</BntBox>
				</BntStack>
			</BntBox>
		</>
	);
}
