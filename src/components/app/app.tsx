import { HistoryRouter } from "redux-first-history/rr6";
import { useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { history } from "services/redux/store/store";
import { BntThemeProvider } from "themes/theme-provider";
import { AppContext } from "context/app-context";
import { modalConfig } from "config/modal-config";
import { BntLoadingProvider } from "shared/loader/loading-provider";
import { BntDialogProvider } from "shared/modal/dialog-provider";
import { BntLayout } from "components/layout/layout";
import { SnackbarProvider } from "notistack";
import { getMenuRoutes } from "routes/get-menu-routes";
import { routesConfig } from "routes/config/routes-config";
import { AppContextType } from "@/types/context";
import "./styles/app.scss";
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
					{/* <BntLayout /> */}
					<AppContext.Provider value={contextValue}>
						<HistoryRouter history={history}>
							<BntLoadingProvider>
								<BntDialogProvider config={modalConfig}>
									<BntLayout />
								</BntDialogProvider>
							</BntLoadingProvider>
						</HistoryRouter>
					</AppContext.Provider>
				</SnackbarProvider>
			</I18nextProvider>
		</BntThemeProvider>
	);
};

export default App;
