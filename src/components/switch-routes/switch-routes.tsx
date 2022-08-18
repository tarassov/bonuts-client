import { FC, useEffect, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useLocationTyped } from "../../hooks/use-location-typed";
import { loginRoute } from "../../routes/routes";

interface ISwithRoutesProps {
	routes: Array<TRoute>;
	redirects?: Array<TRedirect>;
}

const SwitchRoutes: FC<ISwithRoutesProps> = ({ routes }) => {
	const location = useLocationTyped();
	const { checkAuth, isAuthLoading, auth } = useAuth();
	const background = location.state && location.state.background;

	useEffect(() => {
		checkAuth();
	}, []);
	//const from = location.state?.from?.pathname || "/";

	const authenticatedRoutes = useMemo(() => {
		return routes.filter((r) => r.authenticated);
	}, [routes]);

	const anonymousRoutes = useMemo(() => {
		return routes.filter((r) => !r.authenticated);
	}, [routes]);

	if (isAuthLoading) {
		return <div>Checking auth...</div>;
	}

	return (
		<Routes location={background || location}>
			{authenticatedRoutes &&
				authenticatedRoutes.map((route, key) => {
					return (
						<Route
							path={route.path}
							element={
								auth.isAuthenticated ? (
									route.component
								) : (
									<Navigate to={route.redirect?.path || loginRoute.path} />
								)
							}
							key={key}
						/>
					);
				})}

			{anonymousRoutes &&
				anonymousRoutes.map((route, key) => {
					return (
						<Route path={route.path} element={route.component} key={key} />
					);
				})}
		</Routes>
	);
};

export default SwitchRoutes;
