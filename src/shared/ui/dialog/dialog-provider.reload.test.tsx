import { StrictMode, useContext } from "react";
import { Provider } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import { describe, expect, it, vi } from "vitest";

import { defineModal } from "./define-modal";
import { DialogValueContext } from "./dialog-context";
import { BntDialogProvider } from "./dialog-provider";
import { render, screen, waitFor } from "@testing-library/react";

vi.mock("./dialog-container", () => ({ BntDialogContainer: () => null }));

const config = {
	items: {
		Detailed: defineModal<{ id: number }>({ renderItem: () => null, getPath: (data) => `event/${data.id}` }),
	},
};

function OpenedModalsProbe() {
	const modals = useContext(DialogValueContext);

	return <span data-testid="opened">{modals.map((modal) => modal.name).join(",")}</span>;
}

// Mirrors switch-routes: the background location decides which page renders, the modal comes from the history state.
function AppLikeRoutes() {
	const location = useLocation() as { pathname: string; state: { background?: { pathname: string } } | null };
	const { background } = location.state || {};

	return (
		<Routes location={(background as never) || location}>
			<Route path="/feed" element={<span data-testid="page">feed page</span>} />
			<Route path="/event/:id" element={<span data-testid="page">event page</span>} />
		</Routes>
	);
}

describe("BntDialogProvider on a page reload", () => {
	it("reopens the modal restored from the history state and keeps the page behind it", { timeout: 60000 }, async () => {
		// history v5 keeps the user state under `usr`, which is what survives a reload.
		window.history.replaceState({ idx: 0, key: "feed-key", usr: null }, "", "/feed");
		window.history.pushState({ idx: 1, key: "event-key", usr: { background: { pathname: "/feed" }, data: { id: 7 }, modal: true, modalKey: "modal-/feed-3", name: "Detailed" } }, "", "/event/7");

		// The store builds its history from the current url, so it has to be created after the seeding.
		vi.resetModules();
		const { history, store } = await import("services/redux/store/store");
		const { HistoryRouter } = await import("redux-first-history/rr6");

		render(
			<StrictMode>
				<Provider store={store}>
					<HistoryRouter history={history}>
						<BntDialogProvider config={config}>
							<OpenedModalsProbe />
							<AppLikeRoutes />
						</BntDialogProvider>
					</HistoryRouter>
				</Provider>
			</StrictMode>
		);

		await waitFor(() => expect(screen.getByTestId("opened").textContent).toBe("Detailed"));

		expect(screen.getByTestId("page").textContent).toBe("feed page");
		expect(window.location.pathname).toBe("/event/7");
		expect(window.history.state?.usr?.background).toEqual({ pathname: "/feed" });
	});
});
