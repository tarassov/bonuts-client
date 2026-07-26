import { useContext, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { Modules } from "constants/modules";

import { RouterContext } from "@/shared/lib/router";
import { BntBox } from "@/shared/ui/box";
import { BntDialogProvider } from "@/shared/ui/dialog";
import { useLoader } from "@/shared/ui/loader";

import { modalConfig } from "../config/modal-config";

import SwitchRoutes from "./switch-routes";
import { getRoutes } from "routes/get-routes";

import "@/app/ui/app.scss";

import { useProfile } from "@/entities/profile";

export function BntLayout() {
	const { routes, redirects } = useContext(RouterContext);
	const { isLoading } = useProfile();

	useLoader(Modules.Profile, isLoading);

	const routerRoutes = useMemo(() => getRoutes(routes, redirects), [routes, redirects]);

	return (
		// One dialog provider for the whole application: modals outlive route changes and are driven by history.
		<BntDialogProvider config={modalConfig}>
			<BntBox sx={{ display: "flex", height: "100vh" }}>
				<CssBaseline />
				<SwitchRoutes routes={routerRoutes} />
			</BntBox>
		</BntDialogProvider>
	);
}
