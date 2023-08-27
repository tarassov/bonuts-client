import { FC, useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "hooks/use-auth";
import { useLocationTyped } from "hooks/use-location-typed";
import { TAuthState } from "services/redux/types/auth-state";
import { routesPath } from "routes/config/routes-path";
import { BntRoutes } from "routes/config/routes";
import _ from "lodash";
import { ForbiddenPage } from "pages/forbidden-page/forbidden-page";
import { PageWrapper } from "pages/page-wrapper";

interface ISwitchRoutesProps {
	routes: Array<TRoute<any>>;
	// eslint-disable-next-line react/no-unused-prop-types
	redirects?: Array<TRedirect>;
}

const getRoute = (route: TRoute<any>, auth: TAuthState): JSX.Element => {
	if (auth.isAuthenticated && route.authenticatedRedirect) {
		return <Navigate to={route.authenticatedRedirect} />;
	}
	return auth.isAuthenticated || route.anonymous ? (
		<PageWrapper children={route.component} path={route.path} />
	) : (
		<Navigate to={route.redirect || routesPath[BntRoutes.Login]} />
	);
};

const SwitchRoutes: FC<ISwitchRoutesProps> = ({ routes }) => {
	const location = useLocationTyped();
	const { checkAuth, isAuthLoading, auth, currentRoles } = useAuth();
	const background = location.state && location.state.background;

	useEffect(() => {
		checkAuth();
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
			{authenticatedRoutes &&
				authenticatedRoutes.map((route) => {
					const element =
						auth.isAuthenticated && !isAuthLoading && !hasAccess(route) ? (
							<ForbiddenPage />
						) : (
							getRoute(route, auth)
						);
					return <Route path={route.path} element={element} key={route.path} />;
				})}

			{anonymousRoutes &&
				anonymousRoutes.map((route) => {
					return <Route path={route.path} element={getRoute(route, auth)} key={route.path} />;
				})}
		</Routes>
	);
};

export default SwitchRoutes;
