import { Provider } from "react-redux";
import { store, history } from "../../services/store/store";
import { HistoryRouter as Router } from "redux-first-history/rr6";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import SwitchRoutes from "../switch-routes/switch-routes";
import { routes } from "../../routes";
import theme from "../../themes/main-theme";
import { Container } from "@mui/material";

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<Router history={history}>
						<CssBaseline />
						<header className="App-header"></header>
						<Container component="main" maxWidth="md">
							Bonuts
							<SwitchRoutes routes={routes} />
						</Container>
					</Router>
				</Provider>
			</ThemeProvider>
		</div>
	);
}

export default App;
