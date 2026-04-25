import { useContext, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { Modules } from "constants/modules";

import { RouterContext } from "@/shared/lib/router";
import { BntBox } from "@/shared/ui/box";
import { useLoader } from "@/shared/ui/loader";

import { getRoutes } from "routes/get-routes";
import SwitchRoutes from "@/app/ui/switch-routes";

import "@/app/ui/app.scss";

import { useProfile } from "@/entities/profile";

export function BntLayout() {
	const { routes, redirects } = useContext(RouterContext);
	const { isLoading } = useProfile();

	useLoader(Modules.Profile, isLoading);

	const routerRoutes = useMemo(() => getRoutes(routes, redirects), [routes, redirects]);

	return (
		<BntBox sx={{ display: "flex", height: "100vh" }}>
			<CssBaseline />
			<SwitchRoutes routes={routerRoutes} />
		</BntBox>
	);
}
