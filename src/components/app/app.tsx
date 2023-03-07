import { Provider } from "react-redux";
import { store, history } from "../../services/store/store";
import { HistoryRouter } from "redux-first-history/rr6";

import CssBaseline from "@mui/material/CssBaseline";

import SwitchRoutes from "../switch-routes/switch-routes";
import { getRoutes } from "../../routes";

import { Box } from "@mui/material";
import { BTNHeader } from "../header";
import { TProfile } from "../../types/model";
import { BNTThemeProvider } from "../../themes/theme-provider";
import { useMemo, useState } from "react";
import { AppContextType } from "../../types/context";
import { AppContext } from "../../context";
import "./app.scss";

import { I18nextProvider } from "react-i18next";
import i18n from "../../services/localization/i18n";

import { BNTLayout } from "../layout";

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
							<BNTLayout />
						</HistoryRouter>
					</AppContext.Provider>
				</Provider>
			</I18nextProvider>
		</BNTThemeProvider>
	);
}

export default App;
