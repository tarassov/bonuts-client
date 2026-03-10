import { useCallback, useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";

import { SnackbarProvider } from "notistack";

import i18n from "services/localization/i18n";
import { history } from "services/redux/store/store";
import { RouterContext, type TRouterContextType } from "shared/lib/router";
import { BntLoadingProvider } from "shared/ui/loader/loading-provider";
import { LocaleProvider } from "shared/ui/locale/locale-provider";

import { PluginProvider } from "@/entities/plugin";

import { useRouteConfig } from "../config/use-route-config";

import { BntLayout } from "./layout";
import { AppContext } from "context/app-context";
import { HistoryRouter } from "redux-first-history/rr6";
import { getMenuRoutes } from "routes/get-menu-routes";
import { BntThemeProvider } from "themes/theme-provider";

import "./app.scss";

import type { AppContextType } from "@/types/context/app-context-type";

function App() {
	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const routesConfig = useRouteConfig();

	const toggleDrawer = useCallback(() => {
		setDrawerOpen((prev) => !prev);
	}, []);

	const menuRoutes = useMemo(() => getMenuRoutes(routesConfig), [routesConfig]);

	const contextValue: AppContextType = useMemo(() => {
		return {
			isDrawerOpen,
			toggleDrawer,
		};
	}, [isDrawerOpen, toggleDrawer]);

	const routerContextValue: TRouterContextType = useMemo(() => {
		return {
			menuRoutes,
			routes: routesConfig.routes,
			redirects: routesConfig.redirects.redirects,
		};
	}, [menuRoutes, routesConfig]);

	return (
		<BntThemeProvider>
			<I18nextProvider i18n={i18n}>
				<SnackbarProvider>
					<LocaleProvider>
						<AppContext.Provider value={contextValue}>
							<RouterContext.Provider value={routerContextValue}>
								<HistoryRouter history={history}>
									<BntLoadingProvider>
										<PluginProvider>
											<BntLayout />
										</PluginProvider>
									</BntLoadingProvider>
								</HistoryRouter>
							</RouterContext.Provider>
						</AppContext.Provider>
					</LocaleProvider>
				</SnackbarProvider>
			</I18nextProvider>
		</BntThemeProvider>
	);
}

export default App;
