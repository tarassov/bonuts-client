import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { BntDrawerHeader } from "shared/drawer";
import { useAuth } from "hooks/use-auth";
import { AppContext } from "context/app-context";
import "../app/styles/app.scss";
import { useProfileLogic } from "logic/hooks/use-profile-logic";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import SwitchRoutes from "../switch-routes/switch-routes";
import BntSidebar from "../sidebar";
import { BTNHeader } from "../header";

export const BntLayout = () => {
	const { auth } = useAuth();
	const { routes } = useContext(AppContext);
	const { profile, isLoading } = useProfileLogic();
	const { setLoading } = useLoader();

	useEffect(() => {
		setLoading(Modules.Profile, isLoading);
	}, [isLoading]);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			{auth.isAuthenticated && <BTNHeader profile={profile} />}
			{auth.isAuthenticated && <BntSidebar />}
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				{auth.isAuthenticated && <BntDrawerHeader />}
				<SwitchRoutes routes={routes} />
			</Box>
		</Box>
	);
};
