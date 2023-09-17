import { HistoryRouter } from "redux-first-history/rr6";
import { useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { history } from "services/redux/store/store";
import { BntThemeProvider } from "themes/theme-provider";
import { AppContext } from "context/app-context";
import { BntLoadingProvider } from "shared/loader/loading-provider";
import { BntLayout } from "components/layout/layout";
import { SnackbarProvider } from "notistack";
import { getMenuRoutes } from "routes/get-menu-routes";
import { routesConfig } from "routes/config/routes-config";
import "./styles/app.scss";
import { LocaleProvider } from "shared/locale/locale-provider";
import { AppContextType } from "@/types/context/app-context-type";
import i18n from "../../services/localization/i18n";

const App = () => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const toggleDrawer = () => {
		setDrawerOpen(!isDrawerOpen);
	};

	const menuRoutes = useMemo(() => getMenuRoutes(routesConfig), [routesConfig]);

	const contextValue: AppContextType = useMemo(() => {
		return {
			isDrawerOpen,
			toggleDrawer,
			menuRoutes,
			routes: routesConfig.routes,
			redirects: routesConfig.redirects.redirects,
		};
	}, [isDrawerOpen, routesConfig, menuRoutes]);

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
