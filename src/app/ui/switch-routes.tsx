import type { ReactElement } from "react";
import { useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import _ from "lodash";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useLocationTyped } from "hooks/use-location-typed";
import { texts_c, texts_p } from "services/localization/texts";

import { BntRoutes } from "@/shared/config/routes";
import { type TAuthState, useAuth, useCurrentProfile } from "@/shared/model/auth";
import { BntLoader } from "@/shared/ui/loader";

import type { TModalConfig } from "@/entities/modal";
import { useUserActivityHeartbit } from "@/entities/user";

import { ForbiddenPage } from "@/pages/forbidden-page";

import { PageWrapper } from "./page-wrapper";
import { routesPath } from "@/routes/config/routes-path";

interface ISwitchRoutesProps {
	routes: Array<TRoute<any>>;
	// eslint-disable-next-line react/no-unused-prop-types
	redirects?: Array<TRedirect>;
}

const getRoute = (route: TRoute<any>, auth: TAuthState, path: string, modalName?: keyof TModalConfig, modalData?: any): ReactElement => {
	if (route.public) {
		return route.component;
	}

	if (auth.isAuthenticated && !auth.tenant && (!route.tenantNotRequired || route.path === "/")) {
		return <Navigate to={routesPath[BntRoutes.NewUser]} />;
	}
	if (auth.isAuthenticated && route.authenticatedRedirect) {
		return <Navigate to={route.authenticatedRedirect} />;
	}
	if (auth.isAuthenticated && !route.authenticated && route.anonymous) {
		return <Navigate to="/" />;
	}
	return auth.isAuthenticated || route.anonymous ? (
		<PageWrapper isRoot={route.isRoot} children={route.component} path={route.path} addressPath={path} modalData={modalData} modalName={modalName} />
	) : (
		<Navigate to={route.redirect || routesPath[BntRoutes.Login]} />
	);
};

function SwitchRoutes({ routes }: ISwitchRoutesProps) {
	const location = useLocationTyped();
	const { checkAuth, isAuthLoading, auth } = useAuth();
	const { currentRoles } = useCurrentProfile();
	const { background, name, data } = location.state || {};
	const { t } = useBntTranslate();

	useUserActivityHeartbit({
		isEnabled: auth.isAuthenticated,
		tenant: auth.tenant || undefined,
	});

	useEffect(() => {
		checkAuth().catch((e) => console.error("Check auth failed", e));
	}, [checkAuth]);

	const authenticatedRoutes = useMemo(() => {
		return routes.filter((r) => r.authenticated);
	}, [routes]);

	const anonymousRoutes = useMemo(() => {
		return routes.filter((r) => !r.authenticated || r.public);
	}, [routes]);

	if (isAuthLoading) {
		return <BntLoader text={t(texts_c.checking_auth, { capitalize: true })} secondaryText={t(texts_p.please_wait)} />;
	}

	const hasAccess = (route: TRoute<BntRoutes>) => {
		if (!route.roles) return true;
		return !!_.intersection(route.roles, currentRoles).length;
	};

	return (
		<Routes location={background || location}>
			<Route path="*" element={<Navigate to={auth.isAuthenticated ? (!auth.tenant ? routesPath[BntRoutes.NewUser] : "/") : routesPath[BntRoutes.Login]} />} />
			{authenticatedRoutes &&
				authenticatedRoutes
					.filter((x) => x.tenantNotRequired || auth.tenant)
					.map((route) => {
						const element = auth.isAuthenticated && !isAuthLoading && !hasAccess(route) ? <ForbiddenPage /> : getRoute(route, auth, location.pathname, name as keyof TModalConfig, data);
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
