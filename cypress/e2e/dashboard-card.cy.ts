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

function mockDashboardRequests() {
	cy.intercept("GET", "**/api/v1/**", (request) => {
		if (request.url.includes("/events")) {
			request.alias = "getEvents";
			request.reply({
				statusCode: 200,
				headers: {
					"Per-Page": "1",
					Total: "1",
				},
				body: EVENTS_RESPONSE,
			});
			return;
		}

		if (request.url.includes("/profile")) {
			request.reply({
				statusCode: 200,
				body: PROFILE_RESPONSE,
			});
			return;
		}

		if (request.url.includes("/weekly_recognition_badges/latest")) {
			request.reply({ statusCode: 200, body: { badges: [] } });
			return;
		}

		if (request.url.includes("/participation/current_week")) {
			request.reply({ statusCode: 200, body: {} });
			return;
		}

		if (request.url.includes("/participation/weekly_recognition_current")) {
			request.reply({ statusCode: 200, body: {} });
			return;
		}

		request.reply({ statusCode: 200, body: {} });
	});

	cy.intercept("POST", "**/api/v1/**", (request) => {
		if (request.url.includes("/user_activity/heartbeat")) {
			request.reply({ statusCode: 200, body: {} });
			return;
		}

		request.reply({ statusCode: 200, body: {} });
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

describe("Dashboard notification card", () => {
	beforeEach(() => {
		cy.clearLocalStorage();
	});

	it("renders notification card in light and dark themes with reduced header and without avatar", () => {
		visitDashboard("light");

		cy.location("pathname").should("eq", "/");
		cy.get('[data-testid="event-card-notification"]', { timeout: 12000 }).first().as("notificationCard");
		cy.get("@notificationCard").should("be.visible");
		cy.get("@notificationCard").find(".MuiCardHeader-avatar").should("not.exist");
		cy.get("@notificationCard").find(".MuiCardHeader-root").should("have.css", "padding-top", "10px");

		cy.window().then((win) => {
			win.localStorage.setItem("theme", "dark");
		});
		cy.reload();

		cy.location("pathname").should("eq", "/");
		cy.get('[data-testid="event-card-notification"]', { timeout: 12000 }).first().as("notificationCardDark");
		cy.get("@notificationCardDark").should("be.visible");
		cy.get("@notificationCardDark").find(".MuiCardHeader-avatar").should("not.exist");
		cy.get("@notificationCardDark").find(".MuiCardHeader-root").should("have.css", "padding-top", "10px");
	});
});
