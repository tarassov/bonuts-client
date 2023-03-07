import CssBaseline from "@mui/material/CssBaseline";
import { BTNHeader } from "../header";
import BNTSidebar from "../sidebar";
import { Box } from "@mui/material";
import { BNTDrawerHeader } from "../../base/BNTDrawer";
import SwitchRoutes from "../switch-routes/switch-routes";
import { useAuth } from "../../hooks/use-auth";
import { useContext } from "react";
import { AppContext } from "../../context";
import { TProfile } from "../../types/model";
import "../app/app.scss";
import { history } from "../../services/store/store";
import { HistoryRouter } from "redux-first-history/rr6";
import { BNTModalLoader } from "../../base/loader/modal-loader";
import { useProfileLogic } from "../../hooks/logic/useProfileLogic";

export const BNTLayout = () => {
	const { auth } = useAuth();
	const { routes } = useContext(AppContext);
	const { profile, isLoading } = useProfileLogic();

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<BNTModalLoader loading={isLoading} />
			{auth.isAuthenticated && <BTNHeader profile={profile} />}
			{auth.isAuthenticated && <BNTSidebar />}
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				{auth.isAuthenticated && <BNTDrawerHeader />}
				<SwitchRoutes routes={routes} />
			</Box>
		</Box>
	);
};
