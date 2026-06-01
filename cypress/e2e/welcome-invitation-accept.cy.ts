/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { PROFILE_RESPONSE } from "../support/fixtures/profile-response";
import { runInViewports, TEST_VIEWPORTS } from "../support/viewports";

const WELCOME_INVITATIONS_RESPONSE = {
	data: [
		{
			id: 17,
			tenant: {
				name: "avengers",
				caption: "Avengers",
				active_users_count: 12,
				logo: null,
			},
			statuses: {
				activated: false,
				closed: false,
				declined: null,
			},
			expiration_date: null,
			sent_to: {
				email: "tony.stark@example.com",
				name: "Tony Stark",
				first_name: "Tony",
				last_name: "Stark",
			},
			sent_by: {
				email: "nick.fury@example.com",
				name: "Nick Fury",
				first_name: "Nick",
				last_name: "Fury",
			},
			sent_at: "2026-05-26T10:00:00Z",
		},
	],
};

const TENANTS_RESPONSE = {
	data: [],
};

const DASHBOARD_EVENTS_RESPONSE = {
	data: [],
};

const GET_MY_INVITATIONS_URL = /\/invitations\/my(?:\?.*)?$/;
const GET_TENANTS_URL = /\/tenants(?:\?.*)?$/;
const ACCEPT_INVITATION_URL = /\/invitations\/17\/accept(?:\?.*)?$/;
const GET_PROFILE_URL = /\/profile(?:\?.*)?$/;
const GET_EVENTS_URL = /\/events(?:\?.*)?$/;
const GET_WEEKLY_RECOGNITION_BADGES_URL = /\/weekly_recognition_badges\/latest(?:\?.*)?$/;
const GET_PARTICIPATION_CURRENT_WEEK_URL = /\/participation\/current_week(?:\?.*)?$/;
const GET_PARTICIPATION_WEEKLY_RECOGNITION_CURRENT_URL = /\/participation\/weekly_recognition_current(?:\?.*)?$/;
const POST_HEARTBEAT_URL = /\/user_activity\/heartbeat(?:\?.*)?$/;

function mockWelcomeInvitationAcceptFlow() {
	cy.intercept(
		{ method: "GET", url: GET_MY_INVITATIONS_URL },
		{
			statusCode: 200,
			body: WELCOME_INVITATIONS_RESPONSE,
		}
	).as("getMyInvitations");

	cy.intercept({ method: "GET", url: GET_TENANTS_URL }, (request) => {
		request.reply({
			statusCode: 200,
			body: TENANTS_RESPONSE,
		});
	}).as("getTenants");

	cy.intercept(
		{ method: "POST", url: ACCEPT_INVITATION_URL },
		{
			statusCode: 200,
			body: {},
		}
	).as("acceptInvitation");

	cy.intercept(
		{ method: "GET", url: GET_PROFILE_URL },
		{
			statusCode: 200,
			body: PROFILE_RESPONSE,
		}
	).as("getProfile");

	cy.intercept(
		{ method: "GET", url: GET_EVENTS_URL },
		{
			statusCode: 200,
			headers: {
				"Per-Page": "0",
				Total: "0",
			},
			body: DASHBOARD_EVENTS_RESPONSE,
		}
	).as("getEvents");

	cy.intercept(
		{ method: "GET", url: GET_WEEKLY_RECOGNITION_BADGES_URL },
		{
			statusCode: 200,
			body: { badges: [] },
		}
	).as("getWeeklyRecognitionBadges");

	cy.intercept(
		{ method: "GET", url: GET_PARTICIPATION_CURRENT_WEEK_URL },
		{
			statusCode: 200,
			body: {},
		}
	).as("getParticipationCurrentWeek");

	cy.intercept(
		{ method: "GET", url: GET_PARTICIPATION_WEEKLY_RECOGNITION_CURRENT_URL },
		{
			statusCode: 200,
			body: {},
		}
	).as("getWeeklyRecognitionCurrent");

	cy.intercept(
		{ method: "POST", url: POST_HEARTBEAT_URL },
		{
			statusCode: 200,
			body: {},
		}
	).as("postHeartbeat");
}

function visitWelcomePage() {
	mockWelcomeInvitationAcceptFlow();

	cy.visitAuthorized("/welcome", {
		settings: {
			tenant: "",
		},
	});

	cy.wait("@getTenants");
	cy.wait("@getMyInvitations");
}

function clickInvitationAcceptAction(invitationTitle: string) {
	cy.contains("article", invitationTitle).within(() => {
		cy.get("button").last().click();
	});
}

describe("Welcome page invitation accept", () => {
	runInViewports([TEST_VIEWPORTS.desktop, TEST_VIEWPORTS.mobile], () => {
		it("accepts an invitation and redirects to the dashboard", () => {
			visitWelcomePage();

			cy.contains("Avengers").should("be.visible");
			clickInvitationAcceptAction("Avengers");

			cy.wait("@acceptInvitation");
			cy.location("pathname").should("eq", "/");
			cy.window().then((win) => {
				const settings = JSON.parse(win.localStorage.getItem("settings") || "{}");

				expect(settings.tenant).to.eq("avengers");
			});

			cy.wait("@getProfile");
			cy.wait("@getEvents");
		});
	});
});
