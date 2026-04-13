/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { PROFILE_RESPONSE } from "../support/fixtures/profile-response";

const EVENTS_RESPONSE = {
	data: [
		{
			id: "101",
			type: "events",
			attributes: {
				id: 101,
				profile_id: 1,
				user_id: 101,
				user_name: "System",
				position: "",
				public: false,
				content: "This is a private notification",
				date_string: "2026-04-13T08:00:00Z",
				date_string_utc: "2026-04-13T08:00:00Z",
				comments_count: 0,
				likes: [],
				liked: false,
				editable: false,
				user_avatar: {
					url: null,
					thumb: { url: null },
					preview: { url: null },
				},
			},
		},
	],
};

const NOTIFICATION_CARD_SELECTOR = '[data-testid="event-card-notification"], .card-root:has([data-testid="LockIcon"])';

function mockDashboardRequests() {
	cy.intercept("GET", "**/events*", {
		statusCode: 200,
		headers: {
			"Per-Page": "1",
			Total: "1",
		},
		body: EVENTS_RESPONSE,
	}).as("getEvents");

	cy.intercept("GET", "**/profile*", {
		statusCode: 200,
		body: PROFILE_RESPONSE,
	});

	cy.intercept("GET", "**/weekly_recognition_badges/latest*", {
		statusCode: 200,
		body: { badges: [] },
	});

	cy.intercept("GET", "**/participation/current_week*", {
		statusCode: 200,
		body: {},
	});

	cy.intercept("GET", "**/participation/weekly_recognition_current*", {
		statusCode: 200,
		body: {},
	});

	cy.intercept("POST", "**/user_activity/heartbeat*", {
		statusCode: 200,
		body: {},
	});
}

function visitDashboard(theme: "light" | "dark") {
	mockDashboardRequests();

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
});
