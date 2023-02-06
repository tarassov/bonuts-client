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
import { BNTDrawerHeader } from "../../base/BNTDrawer";
import "./app.scss";

import BNTSidebar from "../sidebar";

import { I18nextProvider } from "react-i18next";
import i18n from "../../services/localization/i18n";

const mock_profile: TProfile = {
	admin: true,
	user_name: "Alex T",
	position: "developer",
};

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
		routes: menuRoutes,
	};

	return (
		<BNTThemeProvider>
			<I18nextProvider i18n={i18n}>
				<Provider store={store}>
					<HistoryRouter history={history}>
						<AppContext.Provider value={contextValue}>
							<Box sx={{ display: "flex" }}>
								<CssBaseline />
								<BTNHeader profile={mock_profile} />
								<BNTSidebar />
								<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
									<BNTDrawerHeader />
									<SwitchRoutes routes={routes} />
								</Box>
							</Box>
						</AppContext.Provider>
					</HistoryRouter>
				</Provider>
			</I18nextProvider>
		</BNTThemeProvider>
	);
}

export default App;
