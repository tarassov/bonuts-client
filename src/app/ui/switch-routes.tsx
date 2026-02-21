import { useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CircularProgress, Stack } from "@mui/material";

import _ from "lodash";

import { useLocationTyped } from "hooks/use-location-typed";
import { BntStack } from "shared/ui/stack";

import { type TAuthState, useAuth, useCurrentProfile } from "@/shared/model/auth";
import { BntTypography } from "@/shared/ui/typography";

import type { TModalConfig } from "@/entities/modal";

import { ForbiddenPage } from "@/pages/forbidden-page";

import { PageWrapper } from "./page-wrapper";
import { BntRoutes } from "routes/config/routes";
import { routesPath } from "routes/config/routes-path";

interface ISwitchRoutesProps {
	routes: Array<TRoute<any>>;
	// eslint-disable-next-line react/no-unused-prop-types
	redirects?: Array<TRedirect>;
}

const getRoute = (route: TRoute<any>, auth: TAuthState, path: string, modalName?: keyof TModalConfig, modalData?: any): JSX.Element => {
	if (auth.isAuthenticated && !auth.tenant && (!route.tenantNotRequired || route.path === "/")) {
		return <Navigate to={routesPath[BntRoutes.TenantList]} />;
	}
	if (auth.isAuthenticated && route.authenticatedRedirect) {
		return <Navigate to={route.authenticatedRedirect} />;
	}
	if (auth.isAuthenticated && !route.authenticated && route.anonymous) {
		return <Navigate to="/" />;
	}
	return auth.isAuthenticated || route.anonymous ? (
		<PageWrapper
			isRoot={route.isRoot}
			children={route.component}
			path={route.path}
			addressPath={path}
			modalData={modalData}
			modalName={modalName}
		/>
	) : (
		<Navigate to={route.redirect || routesPath[BntRoutes.Login]} />
	);
};

function SwitchRoutes({ routes }: ISwitchRoutesProps) {
	const location = useLocationTyped();
	const { checkAuth, isAuthLoading, auth } = useAuth();
	const { currentRoles } = useCurrentProfile();
	const { background, name, data } = location.state || {};

	useEffect(() => {
		checkAuth().catch((e) => console.error("Check auth failed", e));
	}, [checkAuth]);

	const authenticatedRoutes = useMemo(() => {
		return routes.filter((r) => r.authenticated);
	}, [routes]);

	const anonymousRoutes = useMemo(() => {
		return routes.filter((r) => !r.authenticated);
	}, [routes]);

	useEffect(() => {
		console.log("isAuthLoading", isAuthLoading);
	}, [isAuthLoading]);

	if (isAuthLoading) {
		return (
			<BntStack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ minHeight: "60vh" }}>
				<CircularProgress size={48} />
				<BntTypography variant="h6">Checking auth...</BntTypography>
			</BntStack>
		);
	}

	const hasAccess = (route: TRoute<BntRoutes>) => {
		if (!route.roles) return true;
		return !!_.intersection(route.roles, currentRoles).length;
	};

	return (
		<Routes location={background || location}>
			<Route
				path="*"
				element={
					<Navigate to={auth.isAuthenticated ? (!auth.tenant ? routesPath[BntRoutes.TenantList] : "/") : routesPath[BntRoutes.Login]} />
				}
			/>
			{authenticatedRoutes &&
				authenticatedRoutes
					.filter((x) => x.tenantNotRequired || auth.tenant)
					.map((route) => {
						const element =
							auth.isAuthenticated && !isAuthLoading && !hasAccess(route) ? (
								<ForbiddenPage />
							) : (
								getRoute(route, auth, location.pathname, name as keyof TModalConfig, data)
							);
						return <Route path={route.path} element={element} key={route.path} />;
					})}

			{anonymousRoutes &&
				anonymousRoutes.map((route) => {
					return <Route path={route.path} element={getRoute(route, auth, location.pathname)} key={route.path} />;
				})}
		</Routes>
	);
}

export default SwitchRoutes;
