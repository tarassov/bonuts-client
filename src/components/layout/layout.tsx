import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { BntDrawerHeader } from "shared/drawer";
import { useAuth } from "hooks/use-auth";
import { AppContext } from "context/app-context";
import "../app/styles/app.scss";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { getRoutes } from "routes/get-routes";
import SwitchRoutes from "../switch-routes/switch-routes";
import BntSidebar from "../sidebar/sidebar";
import { BTNHeader } from "../header/header";
import { BntStack } from "@/shared/stack/stack";

export const BntLayout = () => {
	const { auth } = useAuth();
	const { routes, redirects } = useContext(AppContext);
	const { profile, isLoading } = useProfileLogic();
	const { setLoading } = useLoader();

	useEffect(() => {
		setLoading(Modules.Profile, isLoading);
	}, [isLoading]);

	const routerRoutes = useMemo(() => getRoutes(routes, redirects), [routes, redirects]);

	return (
		<Box sx={{ display: "flex", height: "100vh" }}>
			<CssBaseline />
			{auth.isAuthenticated && <BTNHeader profile={profile} />}
			{auth.isAuthenticated && <BntSidebar />}
			<Box
				component="main"
				sx={{ flexGrow: 1, maxWidth: "100%", height: "100%", overflow: "hidden" }}
			>
				<BntStack direction="column" sx={{ height: "100%", p: 0, m: 0, overflow: "hidden" }}>
					{auth.isAuthenticated && <BntDrawerHeader />}
					<Box sx={{ flexGrow: 1, height: "100%", overflow: "scroll", p: 1 }}>
						<SwitchRoutes routes={routerRoutes} />
					</Box>
				</BntStack>
			</Box>
		</Box>
	);
};
