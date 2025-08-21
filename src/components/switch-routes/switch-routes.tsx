import { FC, useEffect, useMemo } from "react";
import _ from "lodash";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "shared/model/auth/use-auth";
import { useLocationTyped } from "hooks/use-location-typed";
import { TAuthState } from "services/redux/types/auth-state";
import { routesPath } from "routes/config/routes-path";
import { BntRoutes } from "routes/config/routes";
import { ForbiddenPage } from "pages/forbidden-page/forbidden-page";
import { PageWrapper } from "pages/page-wrapper";
import { ModalType } from "config/modal-config";

interface ISwitchRoutesProps {
	routes: Array<TRoute<any>>;
	// eslint-disable-next-line react/no-unused-prop-types
	redirects?: Array<TRedirect>;
}

const getRoute = (
	route: TRoute<any>,
	auth: TAuthState,
	path: string,
	modalName?: keyof ModalType,
	modalData?: any
): JSX.Element => {
	if (auth.isAuthenticated && !auth.tenant && (!route.tenantNotRequired || route.path === "/")) {
		return <Navigate to={routesPath[BntRoutes.TenantList]} />;
	}
	if (auth.isAuthenticated && route.authenticatedRedirect) {
		return <Navigate to={route.authenticatedRedirect} />;
	}
	if (auth.isAuthenticated && !route.authenticated) {
		return <Navigate to="/" />;
	}
	return auth.isAuthenticated || route.anonymous ? (
		<PageWrapper
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

const SwitchRoutes: FC<ISwitchRoutesProps> = ({ routes }) => {
	const location = useLocationTyped();
	const { checkAuth, isAuthLoading, auth, currentRoles } = useAuth();
	const { background, name, data } = location.state || {};

	useEffect(() => {
		checkAuth().catch((e) => console.error("Check auth failed", e));
	}, []);
	// const from = location.state?.from?.pathname || "/";

	const authenticatedRoutes = useMemo(() => {
		return routes.filter((r) => r.authenticated);
	}, [routes, auth]);

	const anonymousRoutes = useMemo(() => {
		return routes.filter((r) => !r.authenticated);
	}, [routes, auth]);

	if (isAuthLoading) {
		return <div>Checking auth...</div>;
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
					<Navigate
						to={
							auth.isAuthenticated
								? !auth.tenant
									? routesPath[BntRoutes.TenantList]
									: "/"
								: routesPath[BntRoutes.Login]
						}
					/>
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
								getRoute(route, auth, location.pathname, name as keyof ModalType, data)
							);
						return <Route path={route.path} element={element} key={route.path} />;
					})}

			{anonymousRoutes &&
				anonymousRoutes.map((route) => {
					return <Route path={route.path} element={getRoute(route, auth, location.pathname)} key={route.path} />;
				})}
		</Routes>
	);
};

export default SwitchRoutes;
