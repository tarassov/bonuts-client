/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress helper */

import { mockHeartbeatRequest } from "./api";
import { DASHBOARD_DISTRIB_ACCOUNT_RESPONSE, DASHBOARD_PROFILE_RESPONSE, DASHBOARD_TENANTS_RESPONSE } from "./dashboard-page";

export const ACCOUNT_OPERATIONS_HISTORY_RESPONSE = {
	data: [
		{
			account_type: "self",
			amount: 2,
			comment: "The order was cancelled by the store",
			created_at: "2026-07-23T20:45:00Z",
			direction: 1,
			id: 1,
			operation_type: "refund",
			purchase: { product_id: 21, product_name: "Hoodie Bonuts", request_id: 11, status: 0, status_name: "incoming" },
		},
		{
			account_type: "self",
			amount: 10,
			comment: "Store · code issued",
			created_at: "2026-07-19T17:21:00Z",
			direction: -1,
			id: 2,
			operation_type: "purchase",
			purchase: { product_id: 1, product_name: "Ozon certificate", request_id: 12, status: 1, status_name: "active" },
		},
		{
			account_type: "distrib",
			amount: 1,
			comment: "Donut for helping with the release",
			created_at: "2026-06-24T21:55:00Z",
			direction: 1,
			from_profile: { id: 5, name: "Pepper Potts" },
			id: 3,
			operation_type: "transfer",
		},
	],
};

export const ACCOUNT_OPERATIONS_SUMMARY_RESPONSE = {
	data: {
		period: { date_from: null, date_to: null },
		profile_id: 1,
		purchases_count: 6,
		received_from_colleagues: 7,
		received_from_colleagues_count: 7,
		refunded: 29,
		refunds_count: 5,
		spent: 125,
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

	mockHeartbeatRequest();

	cy.intercept("GET", "**/account_operations/history*", {
		statusCode: 200,
		body: ACCOUNT_OPERATIONS_HISTORY_RESPONSE,
	}).as("getAccountOperationsHistory");

	cy.intercept("GET", "**/account_operations/summary*", {
		statusCode: 200,
		body: ACCOUNT_OPERATIONS_SUMMARY_RESPONSE,
	}).as("getAccountOperationsSummary");
}
