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
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			{auth.isAuthenticated && <BTNHeader profile={profile} />}
			{auth.isAuthenticated && <BntSidebar />}
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				{auth.isAuthenticated && <BntDrawerHeader />}
				<SwitchRoutes routes={routerRoutes} />
			</Box>
		</Box>
	);
};
