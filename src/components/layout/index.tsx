import CssBaseline from "@mui/material/CssBaseline";
import { BTNHeader } from "../header";
import BNTSidebar from "../sidebar";
import { Box } from "@mui/material";
import { BNTDrawerHeader } from "../../base/BNTDrawer";
import SwitchRoutes from "../switch-routes/switch-routes";
import { useAuth } from "../../hooks/use-auth";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/app-context";
import "../app/styles/app.scss";
import { useProfileLogic } from "../../logic/hooks/useProfileLogic";
import { useLoader } from "../../base/loader/hooks/use-loader";

export const BNTLayout = () => {
	const { auth } = useAuth();
	const { routes } = useContext(AppContext);
	const { profile, isLoading } = useProfileLogic();
	const { setLoading } = useLoader();

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading]);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			{auth.isAuthenticated && <BTNHeader profile={profile} />}
			{auth.isAuthenticated && <BNTSidebar />}
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				{auth.isAuthenticated && <BNTDrawerHeader />}
				<SwitchRoutes routes={routes} />
			</Box>
		</Box>
	);
};
