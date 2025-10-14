import { useContext, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AppContext } from "context/app-context";
import { getRoutes } from "routes/get-routes";

import { useAuth } from "shared/model/auth/use-auth";
import { BntBox } from "shared/ui/box/bnt-box";
import { BntDrawerHeader } from "shared/ui/drawer";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { BntStack } from "shared/ui/stack";

import { Modules } from "constants/modules";

import { BTNHeader } from "components/header/header";
import BntSidebar from "components/sidebar/sidebar";

import SwitchRoutes from "@/app/ui/switch-routes";

import "@/app/ui/app.scss";

import { useProfileLogic } from "@/entities/profile";

export function BntLayout() {
	const { auth } = useAuth();
	const { routes, redirects } = useContext(AppContext);
	const { profile, isLoading } = useProfileLogic();

	useLoader(Modules.Profile, isLoading);

	const routerRoutes = useMemo(() => getRoutes(routes, redirects), [routes, redirects]);

	return (
		<BntBox sx={{ display: "flex", height: "100vh" }}>
			<CssBaseline />
			{auth.isAuthenticated && <BTNHeader profile={profile} />}
			{auth.isAuthenticated && <BntSidebar />}
			<BntBox component="main" sx={{ flexGrow: 1, maxWidth: "100%", height: "100%", overflow: "hidden" }}>
				<BntStack direction="column" sx={{ height: "100%", p: 0, m: 0, overflow: "hidden" }}>
					{auth.isAuthenticated && <BntDrawerHeader />}
					<BntBox sx={{ flexGrow: 1, height: "100%", overflowY: "auto", p: 1 }}>
						<SwitchRoutes routes={routerRoutes} />
					</BntBox>
				</BntStack>
			</BntBox>
		</BntBox>
	);
}
