import { FC, useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "hooks/use-auth";
import { useLocationTyped } from "hooks/use-location-typed";
import { loginRoute } from "routes/routes";
import { TAuthState } from "services/redux/auth-slice";

interface ISwithRoutesProps {
	routes: Array<TRoute>;
	// eslint-disable-next-line react/no-unused-prop-types
	redirects?: Array<TRedirect>;
}

const getRoute = (route: TRoute, auth: TAuthState): JSX.Element => {
	if (auth.isAuthenticated && route.authenticatedRedirect) {
		return <Navigate to={route.authenticatedRedirect.path} />;
	}
	return auth.isAuthenticated || route.anonymous ? (
		route.component
	) : (
		<Navigate to={route.redirect?.path || loginRoute.path} />
	);
};

const SwitchRoutes: FC<ISwithRoutesProps> = ({ routes }) => {
	const location = useLocationTyped();
	const { checkAuth, isAuthLoading, auth } = useAuth();
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

	return (
		<Routes location={background || location}>
			{authenticatedRoutes &&
				authenticatedRoutes.map((route) => {
					return (
						<Route
							path={route.path}
							element={getRoute(route, auth)}
							key={route.path}
						/>
					);
				})}

			{anonymousRoutes &&
				anonymousRoutes.map((route) => {
					return (
						<Route
							path={route.path}
							element={getRoute(route, auth)}
							key={route.path}
						/>
					);
				})}
		</Routes>
	);
};

export default SwitchRoutes;
