import { Provider } from "react-redux";
import { store, history } from "../../services/store/store";
import { HistoryRouter } from "redux-first-history/rr6";
import { getRoutes } from "../../routes";
import { BNTThemeProvider } from "../../themes/theme-provider";
import { useMemo, useState } from "react";
import { AppContextType } from "../../types/context";
import { AppContext } from "../../context/app-context";
import "./styles/app.scss";

import { I18nextProvider } from "react-i18next";
import i18n from "../../services/localization/i18n";

import { BNTLayout } from "../layout";
import { BntLoadingProvider } from "../../base/loader/loading-provider";

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
		<BNTThemeProvider>
			<I18nextProvider i18n={i18n}>
				<Provider store={store}>
					{/*<BNTLayout />*/}
					<AppContext.Provider value={contextValue}>
						<HistoryRouter history={history}>
							<BntLoadingProvider>
								<BNTLayout />
							</BntLoadingProvider>
						</HistoryRouter>
					</AppContext.Provider>
				</Provider>
			</I18nextProvider>
		</BNTThemeProvider>
	);
}

export default App;
