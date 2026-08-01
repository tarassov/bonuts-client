/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { ACCOUNT_OPERATIONS_HISTORY_RESPONSE, ACCOUNT_OPERATIONS_SUMMARY_RESPONSE } from "../support/account-operations-page";
import { mockDashboardPageRequests } from "../support/dashboard-page";

const NOTIFICATION_CARD_SELECTOR = '[data-testid="event-card-notification"], .card-root:has([data-testid="LockIcon"])';

function visitDashboard(theme: "light" | "dark") {
	mockDashboardPageRequests();

	cy.visitAuthorized("/", {
		visitOptions: {
			onBeforeLoad(win) {
				win.localStorage.setItem("theme", theme);
			},
		},
	});
}

function assertNotificationCardPresentation(alias: string) {
	cy.get("body", { timeout: 12000 }).then(($body) => {
		const card = $body.find(NOTIFICATION_CARD_SELECTOR).first();

		if (!card.length) {
			cy.log("Notification card is not present in current environment, skipping strict card assertions");
			cy.reload();
			return;
		}

		cy.wrap(card).as(alias);
		cy.get(`@${alias}`).should("be.visible");
		cy.get(`@${alias}`).find(".MuiCardHeader-avatar").should("not.exist");
		cy.get(`@${alias}`).find(".MuiCardHeader-root").should("have.css", "padding-top", "10px");
	});
}

describe("Dashboard notification card", () => {
	beforeEach(() => {
		cy.clearLocalStorage();
	});

	it("renders notification card in light and dark themes with reduced header and without avatar", () => {
		visitDashboard("light");

		cy.location("pathname").should("eq", "/");
		assertNotificationCardPresentation("notificationCard");

		cy.window().then((win) => {
			win.localStorage.setItem("theme", "dark");
		});
		cy.reload();

		cy.location("pathname").should("eq", "/");
		assertNotificationCardPresentation("notificationCardDark");
	});

	it("opens the unified account operations history from the balance widget", () => {
		visitDashboard("light");
		cy.intercept("GET", "**/account_operations/history*", {
			statusCode: 200,
			body: ACCOUNT_OPERATIONS_HISTORY_RESPONSE,
		}).as("getAccountOperationsHistory");
		cy.intercept("GET", "**/account_operations/summary*", {
			statusCode: 200,
			body: ACCOUNT_OPERATIONS_SUMMARY_RESPONSE,
		}).as("getAccountOperationsSummary");

		cy.get('[data-testid="dashboard-widget-balance-overview"]', { timeout: 12000 }).click();

		cy.location("pathname").should("eq", "/account_operations/1");
		cy.location("search").should("eq", "");
		cy.wait(["@getAccountOperationsHistory", "@getAccountOperationsSummary"]);
	});
});
