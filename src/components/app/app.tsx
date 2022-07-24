import { Provider } from "react-redux";
import { store, history } from "../../services/store/store";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Router history={history}>
					<header className="App-header"></header>
					<main>Bonuts</main>
				</Router>
			</Provider>
		</div>
	);
}

export default App;
