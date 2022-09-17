import { Provider } from "react-redux";
import { store, history } from "../../services/store/store";
import { HistoryRouter } from "redux-first-history/rr6";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import SwitchRoutes from "../switch-routes/switch-routes";
import { getRoutes } from "../../routes";
import theme from "../../themes/main-theme";
import { Container } from "@mui/material";

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<HistoryRouter history={history}>
						<CssBaseline />
						<header className="App-header"></header>
						<Container component="main" maxWidth="md">
							Bonuts
							<SwitchRoutes routes={getRoutes()} />
						</Container>
					</HistoryRouter>
				</Provider>
			</ThemeProvider>
		</div>
	);
}

export default App;
