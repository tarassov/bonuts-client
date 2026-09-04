/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress helper */

import { mockHeartbeatRequest } from "./api";
import { PROFILE_RESPONSE } from "./fixtures/profile-response";

export const DASHBOARD_PROFILE_RESPONSE = {
	...PROFILE_RESPONSE,
	data: {
		...PROFILE_RESPONSE.data,
		attributes: {
			...PROFILE_RESPONSE.data.attributes,
			distrib_account: {
				id: 10,
				tenant_id: 1,
				profile_id: 1,
			},
		},
	},
};

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

export const DASHBOARD_COLLEAGUES_RESPONSE = {
	data: [
		{
			id: 2,
			user_id: 202,
			active: true,
			admin: false,
			roles: [],
			circles: [],
			first_name: "Pepper",
			last_name: "Potts",
			name: "Pepper Potts",
			position: "CEO",
			email: "pepper.potts@example.com",
			contact: null,
			bio: null,
			birthdate: null,
			in_date: null,
			locale: "en",
			last_seen_at: "2026-04-13T08:00:00Z",
			is_online: true,
			user_avatar: {
				url: null,
				thumb: { url: null },
				preview: { url: null },
			},
		},
	],
	meta: {
		online_count: 1,
		team_count: 1,
	},
};

export const DASHBOARD_DISTRIB_ACCOUNT_RESPONSE = {
	data: {
		id: "10",
		type: "accounts",
		attributes: {
			id: 10,
			balance: 12,
			type: "distrib",
		},
	},
};

export const DASHBOARD_TENANTS_RESPONSE = {
	data: [
		{
			id: "1",
			type: "tenants",
			attributes: {
				id: 1,
				name: "test-tenant",
				caption: "Test Tenant",
				active: true,
				created_at: "2026-04-13T08:00:00Z",
				updated_at: "2026-04-13T08:00:00Z",
				domain: "test-tenant",
				demo: false,
				logo: {
					url: "",
					thumb: {
						url: "",
					},
				},
				welcome_points: 0,
				welcome_donuts: 0,
				email_notification: true,
				birthday_donuts: 0,
				birthday_points: 0,
				join_to_project_donuts: 0,
				join_to_company_donuts: 0,
				join_to_project_points: 0,
				join_to_company_points: 0,
				use_departments: false,
			},
		},
	],
};

export function mockDashboardPageRequests() {
	cy.intercept("GET", /\/profile(?:\?.*)?$/, {
		statusCode: 200,
		body: DASHBOARD_PROFILE_RESPONSE,
	}).as("getProfile");

	cy.intercept("GET", /\/events(?:\?.*)?$/, {
		statusCode: 200,
		headers: {
			"Per-Page": "1",
			Total: "1",
		},
		body: DASHBOARD_EVENTS_RESPONSE,
	}).as("getEvents");

	cy.intercept("GET", /\/weekly_recognition_badges\/latest(?:\?.*)?$/, {
		statusCode: 200,
		body: DASHBOARD_WEEKLY_BADGES_RESPONSE,
	}).as("getWeeklyBadges");

	cy.intercept("GET", /\/participation\/current_week(?:\?.*)?$/, {
		statusCode: 200,
		body: DASHBOARD_CURRENT_WEEK_RESPONSE,
	}).as("getParticipationCurrentWeek");

	cy.intercept("GET", /\/participation\/weekly_recognition_current(?:\?.*)?$/, {
		statusCode: 200,
		body: DASHBOARD_WEEKLY_RECOGNITION_CURRENT_RESPONSE,
	}).as("getParticipationWeeklyRecognitionCurrent");

	cy.intercept("GET", /\/accounts\/10(?:\?.*)?$/, {
		statusCode: 200,
		body: DASHBOARD_DISTRIB_ACCOUNT_RESPONSE,
	}).as("getDistribAccount");

	cy.intercept("GET", /\/tenants(?:\?.*)?$/, {
		statusCode: 200,
		body: DASHBOARD_TENANTS_RESPONSE,
	}).as("getTenants");

	mockHeartbeatRequest();
}

export function mockGiveDonutsModalRequests() {
	cy.intercept("GET", "**/profiles*", {
		statusCode: 200,
		headers: {
			"Per-Page": "24",
			Total: "1",
		},
		body: DASHBOARD_COLLEAGUES_RESPONSE,
	}).as("getProfiles");

	cy.intercept("GET", "**/accounts/10*", {
		statusCode: 200,
		body: DASHBOARD_DISTRIB_ACCOUNT_RESPONSE,
	}).as("getDistribAccount");

	cy.intercept("POST", "**/account_operations/transfer*", {
		statusCode: 200,
		body: {
			error: false,
			message: "Transferred",
		},
	}).as("postTransferDonuts");
}

export function signInToDashboard() {
	cy.intercept("POST", "**/authenticate", {
		statusCode: 200,
		body: {
			auth_token: "test-auth-token",
			currentTenant: "test-tenant",
			tenants: [{ name: "test-tenant" }],
		},
	}).as("loginRequest");

	cy.visit("/login");
	cy.get("#email").type("test@example.com");
	cy.get("#password").type("password123");
	mockDashboardPageRequests();
	cy.get('button[type="submit"]').click();

	cy.wait("@loginRequest");
	cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
}

export function visitDashboard(theme: "light" | "dark") {
	mockDashboardPageRequests();

	cy.visitAuthorized("/", {
		visitOptions: {
			onBeforeLoad(win) {
				win.localStorage.setItem("theme", theme);
			},
		},
	});
}
