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

import BNTSidebar from "../sidebar";

const mock_profile: TProfile = {
	first_name: "Alex",
	last_name: "T",
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
		</BNTThemeProvider>
	);
}

export default App;
