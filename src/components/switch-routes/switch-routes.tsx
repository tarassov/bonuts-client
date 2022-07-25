import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocationTyped } from "../../hooks/use-location-typed";

interface ISwithRoutesProps {
	routes: Array<TRoute>;
	redirects?: Array<TRedirect>;
}

const SwitchRoutes: FC<ISwithRoutesProps> = ({ routes, redirects }) => {
	const location = useLocationTyped();
	const background = location.state && location.state.background;
	//const from = location.state?.from?.pathname || "/";
	return (
		<Routes location={background || location}>
			{routes &&
				routes.map((route, key) => {
					return (
						<Route path={route.path} element={route.component} key={key} />
					);
				})}

			{redirects &&
				redirects.map((redirect, key) => {
					return (
						<Route
							path={redirect.from.path}
							key={key}
							element={<Navigate to={redirect.to.path} />}
						/>
					);
				})}
		</Routes>
	);
};

export default SwitchRoutes;
