/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress helper */

import { DASHBOARD_DISTRIB_ACCOUNT_RESPONSE, DASHBOARD_PROFILE_RESPONSE, DASHBOARD_TENANTS_RESPONSE } from "./dashboard-page";

export const ACCOUNT_OPERATIONS_HISTORY_RESPONSE = {
	data: [
		{
			account_type: "self",
			amount: 2,
			created_at_utc: "2026-07-23T20:45:00Z",
			description: "The order was cancelled by the store",
			id: 1,
			operation_type: "refund",
			title: "Refund for Hoodie Bonuts",
		},
		{
			account_type: "self",
			amount: 10,
			created_at_utc: "2026-07-19T17:21:00Z",
			description: "Store · code issued",
			direction: -1,
			id: 2,
			operation_type: "purchase",
			title: "Ozon certificate",
		},
		{
			account_type: "distrib",
			amount: 1,
			created_at_utc: "2026-06-24T21:55:00Z",
			description: "From Pepper Potts",
			id: 3,
			operation_type: "transfer",
			title: "Donut for helping with the release",
		},
	],
};

export const ACCOUNT_OPERATIONS_SUMMARY_RESPONSE = {
	data: {
		coin_operations_count: 12,
		donut_operations_count: 6,
		operations_count: 18,
		purchases_count: 6,
		received_donuts: 7,
		returned_coins: 29,
		spent_coins: 125,
	},
};

export function mockAccountOperationsPageRequests() {
	cy.intercept("GET", /\/profile(?:\?.*)?$/, {
		statusCode: 200,
		body: DASHBOARD_PROFILE_RESPONSE,
	}).as("getProfile");

	cy.intercept("GET", "**/accounts/10*", {
		statusCode: 200,
		body: DASHBOARD_DISTRIB_ACCOUNT_RESPONSE,
	}).as("getDistribAccount");

	cy.intercept("GET", /\/tenants(?:\?.*)?$/, {
		statusCode: 200,
		body: DASHBOARD_TENANTS_RESPONSE,
	}).as("getTenants");

	cy.intercept("POST", "**/user_activity/heartbeat*", {
		statusCode: 200,
		body: {},
	}).as("postHeartbeat");

	cy.intercept("GET", "**/account_operations/history*", {
		statusCode: 200,
		body: ACCOUNT_OPERATIONS_HISTORY_RESPONSE,
	}).as("getAccountOperationsHistory");

	cy.intercept("GET", "**/account_operations/summary*", {
		statusCode: 200,
		body: ACCOUNT_OPERATIONS_SUMMARY_RESPONSE,
	}).as("getAccountOperationsSummary");
}
