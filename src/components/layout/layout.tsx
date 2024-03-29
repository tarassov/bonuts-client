import CssBaseline from "@mui/material/CssBaseline";

import { useContext, useMemo } from "react";
import { BntDrawerHeader } from "shared/drawer";
import { useAuth } from "logic/hooks/auth/use-auth";
import { AppContext } from "context/app-context";
import "../app/styles/app.scss";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { getRoutes } from "routes/get-routes";
import { BntBox } from "shared/box/bnt-box";
import SwitchRoutes from "../switch-routes/switch-routes";
import BntSidebar from "../sidebar/sidebar";
import { BTNHeader } from "../header/header";
import { BntStack } from "@/shared/stack/stack";

export const BntLayout = () => {
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
			<BntBox
				component="main"
				sx={{ flexGrow: 1, maxWidth: "100%", height: "100%", overflow: "hidden" }}
			>
				<BntStack direction="column" sx={{ height: "100%", p: 0, m: 0, overflow: "hidden" }}>
					{auth.isAuthenticated && <BntDrawerHeader />}
					<BntBox sx={{ flexGrow: 1, height: "100%", overflowY: "auto", p: 1 }}>
						<SwitchRoutes routes={routerRoutes} />
					</BntBox>
				</BntStack>
			</BntBox>
		</BntBox>
	);
};
