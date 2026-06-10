/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress helper */

import { PROFILE_RESPONSE } from "./fixtures/profile-response";

export const DASHBOARD_PROFILE_RESPONSE = PROFILE_RESPONSE;

export const DASHBOARD_EVENTS_RESPONSE = {
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
				last_seen_at: "2026-04-13T08:00:00Z",
				user_avatar: {
					url: null,
					thumb: { url: null },
					preview: { url: null },
				},
			},
		},
	],
};

export const DASHBOARD_WEEKLY_BADGES_RESPONSE = {
	badges: [
		{
			score: 15,
			title: "Recognition Rocket",
			profile: {
				id: 2,
				first_name: "Bruce",
				last_name: "Wayne",
				full_name: "Bruce Wayne",
				avatar: "",
			},
		},
		{
			score: 12,
			title: "Silent Support",
			profile: {
				id: 3,
				first_name: "Clark",
				last_name: "Kent",
				full_name: "Clark Kent",
				avatar: "",
			},
		},
	],
	week_start: "2026-04-07",
	week_end: "2026-04-13",
};

export const DASHBOARD_CURRENT_WEEK_RESPONSE = {
	weekly_score_scaled: 88,
	position_percentile: "0.32",
	current_bucket: "0.25",
	next_bucket_threshold_score_scaled: 120,
	delta_score_to_next_bucket_scaled: 32,
	highest_bucket_reached: false,
	suggestions: [
		{
			type: "comment",
			message: "Comment on a teammate's achievement",
			estimated_gain_scaled: 18,
		},
		{
			type: "donut",
			message: "Share donuts with a colleague",
			estimated_gain_scaled: 24,
		},
	],
};

export const DASHBOARD_WEEKLY_RECOGNITION_CURRENT_RESPONSE = {
	likes_given_count: 4,
	comments_given_count: 3,
	sent_donuts_count: 2,
	received_donuts_count: 5,
};

export function mockDashboardPageRequests() {
	cy.intercept("GET", "**/profile*", {
		statusCode: 200,
		body: DASHBOARD_PROFILE_RESPONSE,
	}).as("getProfile");

	cy.intercept(
		"GET",
		"**/events*",
		{
			statusCode: 200,
			headers: {
				"Per-Page": "1",
				Total: "1",
			},
			body: DASHBOARD_EVENTS_RESPONSE,
		}
	).as("getEvents");

	cy.intercept(
		"GET",
		"**/weekly_recognition_badges/latest*",
		{
			statusCode: 200,
			body: DASHBOARD_WEEKLY_BADGES_RESPONSE,
		}
	).as("getWeeklyBadges");

	cy.intercept(
		"GET",
		"**/participation/current_week*",
		{
			statusCode: 200,
			body: DASHBOARD_CURRENT_WEEK_RESPONSE,
		}
	).as("getParticipationCurrentWeek");

	cy.intercept(
		"GET",
		"**/participation/weekly_recognition_current*",
		{
			statusCode: 200,
			body: DASHBOARD_WEEKLY_RECOGNITION_CURRENT_RESPONSE,
		}
	).as("getParticipationWeeklyRecognitionCurrent");

	cy.intercept(
		"POST",
		"**/user_activity/heartbeat*",
		{
			statusCode: 200,
			body: {},
		}
	).as("postHeartbeat");
}

export function visitDashboardPage() {
	mockDashboardPageRequests();

	cy.visitAuthorized("/");
	cy.location("pathname").should("eq", "/");
	cy.get('[data-testid="dashboard-page"]', { timeout: 10000 }).should("be.visible");
	cy.contains("This is a private notification", { timeout: 10000 }).should("be.visible");
}
