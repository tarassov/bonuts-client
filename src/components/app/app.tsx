import { Provider } from "react-redux";
import { HistoryRouter } from "redux-first-history/rr6";
import { useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { store, history } from "services/store/store";
import { BntThemeProvider } from "themes/theme-provider";
import { AppContext } from "context/app-context";
import { modalConfig } from "config/modal-config";
import { BntLoadingProvider } from "shared/loader/loading-provider";
import { BntDialogProvider } from "shared/modal/dialog-provider";
import { BntLayout } from "components/layout/layout";
import { getRoutes } from "@/routes";
import { AppContextType } from "@/types/context";
import "./styles/app.scss";
import i18n from "../../services/localization/i18n";

const App = () => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const toggleDrawer = () => {
		setDrawerOpen(!isDrawerOpen);
	};

	const routes = useMemo(() => getRoutes(), []);
	const menuRoutes = useMemo(() => {
		return routes.filter((x) => !x.hideInMenu && x.navbarName);
	}, [routes]);

	const contextValue: AppContextType = useMemo(() => {
		return {
			isDrawerOpen,
			toggleDrawer,
			menuRoutes,
			routes,
		};
	}, [isDrawerOpen, routes, menuRoutes]);

	return (
		<BntThemeProvider>
			<I18nextProvider i18n={i18n}>
				<Provider store={store}>
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
				</Provider>
			</I18nextProvider>
		</BntThemeProvider>
	);
};

export default App;
