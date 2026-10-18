import { useContext, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { Modules } from "constants/modules";
import { useAppSelector } from "services/redux/store/store";

import { RouterContext } from "@/shared/lib/router";
import { selectIsTenantAuthenticated } from "@/shared/model/auth";
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
	const isTenantAuthenticated = useAppSelector(selectIsTenantAuthenticated);

	useLoader(Modules.Profile, isLoading);

	const routerRoutes = useMemo(() => getRoutes(routes, redirects), [routes, redirects]);

	return (
		// One dialog provider for the whole application: modals outlive route changes and are driven by history.
		// A modal restored from history waits for the tenant, otherwise it would request data without one.
		<BntDialogProvider config={modalConfig} isRestoreEnabled={isTenantAuthenticated}>
			<BntBox sx={{ display: "flex", height: "100vh" }}>
				<CssBaseline />
				<SwitchRoutes routes={routerRoutes} />
			</BntBox>
		</BntDialogProvider>
	);
}
