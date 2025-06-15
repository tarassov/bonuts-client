import { useCallback, useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { AppContext } from "context/app-context";
import { SnackbarProvider } from "notistack";
import { HistoryRouter } from "redux-first-history/rr6";
import { routesConfig } from "routes/config/routes-config";
import { getMenuRoutes } from "routes/get-menu-routes";
import { BntThemeProvider } from "themes/theme-provider";

import { BntLoadingProvider } from "shared/ui/loader/loading-provider";
import { LocaleProvider } from "shared/ui/locale/locale-provider";

import i18n from "services/localization/i18n";
import { history } from "services/redux/store/store";

import { BntLayout } from "@/app/ui/layout";

import "../styles/app.scss";

import type { AppContextType } from "@/types/context/app-context-type";

const App = () => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = useCallback(() => {
		setDrawerOpen((prev) => !prev);
	}, []);

	const menuRoutes = useMemo(() => getMenuRoutes(routesConfig), []);

	const contextValue: AppContextType = useMemo(() => {
		return {
			isDrawerOpen,
			toggleDrawer,
			menuRoutes,
			routes: routesConfig.routes,
			redirects: routesConfig.redirects.redirects,
		};
	}, [isDrawerOpen, toggleDrawer, menuRoutes]);

	return (
		<BntThemeProvider>
			<I18nextProvider i18n={i18n}>
				<SnackbarProvider>
					<LocaleProvider>
						<AppContext.Provider value={contextValue}>
							<HistoryRouter history={history}>
								<BntLoadingProvider>
									<BntLayout />
								</BntLoadingProvider>
							</HistoryRouter>
						</AppContext.Provider>
					</LocaleProvider>
				</SnackbarProvider>
			</I18nextProvider>
		</BntThemeProvider>
	);
};

export default App;
