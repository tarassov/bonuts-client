import { Provider } from "react-redux";
import { store, history } from "../../services/store/store";
import { HistoryRouter } from "redux-first-history/rr6";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import SwitchRoutes from "../switch-routes/switch-routes";
import { getRoutes } from "../../routes";
import theme from "../../themes/main-theme";
import {
	AppBar,
	Box,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import { BTNHeader } from "../header/header";
import { TProfile } from "../../types/model/profile";
import MenuIcon from "@mui/icons-material/Menu";

const mock_profile: TProfile = {
	first_name: "Alex",
	last_name: "T",
	position: "developer",
};

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<HistoryRouter history={history}>
						<BTNHeader profile={mock_profile} />

						<Container component="main">
							<SwitchRoutes routes={getRoutes()} />
						</Container>
					</HistoryRouter>
				</Provider>
			</ThemeProvider>
		</div>
	);
}

export default App;
