import { Provider } from "react-redux";
import { store, history } from "../../services/store/store";
import { HistoryRouter } from "redux-first-history/rr6";
import { getRoutes } from "../../routes";
import { BntThemeProvider } from "../../themes/theme-provider";
import { useMemo, useState } from "react";
import { AppContextType } from "../../types/context";
import { AppContext } from "../../context/app-context";
import "./styles/app.scss";

import { I18nextProvider } from "react-i18next";
import i18n from "../../services/localization/i18n";

import { BntLayout } from "../layout/layout";
import { BntLoadingProvider } from "../../shared/loader/loading-provider";
import { BntDialogProvider } from "../../shared/modal/dialog-provider";
import { modalConfig } from "../../config/modal-config";

function App() {
	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const toggleDrawer = () => {
		setDrawerOpen(!isDrawerOpen);
	};

	const routes = useMemo(() => getRoutes(), []);
	const menuRoutes = useMemo(() => {
		return routes.filter((x) => !x.hideInMenu && x.navbarName);
	}, [routes]);
	const contextValue: AppContextType = {
		isDrawerOpen,
		toggleDrawer,
		menuRoutes: menuRoutes,
		routes: routes,
	};

	return (
		<BntThemeProvider>
			<I18nextProvider i18n={i18n}>
				<Provider store={store}>
					{/*<BntLayout />*/}
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
}

export default App;
