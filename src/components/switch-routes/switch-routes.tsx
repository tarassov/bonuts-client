import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

interface ISwithRoutesProps {
	routes: Array<TRoute>;
	redirects: Array<TRedirect>;
}

const SwitchRoutes: FC<ISwithRoutesProps> = ({ routes, redirects }) => {
	return (
		<Routes>
			{routes &&
				routes.map((route, key) => {
					return (
						<Route path={route.path} element={route.component} key={key} />
					);
				})}

			{redirects.map((redirect, key) => {
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
