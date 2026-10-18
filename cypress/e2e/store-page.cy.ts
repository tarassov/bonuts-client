/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { mockHeartbeatRequest } from "../support/api";
import { PROFILE_RESPONSE } from "../support/fixtures/profile-response";
import { runInViewports, TEST_VIEWPORTS } from "../support/viewports";

const GET_DONUTS_URL = /\/api\/v1\/donuts(?:\?.*)?$/;
const GET_PROFILE_URL = /\/profile(?:\?.*)?$/;
const GET_TENANTS_URL = /\/tenants(?:\?.*)?$/;

const TENANTS_RESPONSE = {
	data: [
		{
			id: "1",
			type: "tenants",
			attributes: {
				active_users_count: 1,
				caption: "Test tenant",
				logo: null,
				name: "test-tenant",
			},
		},
	],
};

const DONUTS_RESPONSE = {
	data: [
		{
			active: true,
			available: true,
			expiration_date: null,
			id: 1,
			logo: null,
			name: "Hoodie Bonuts",
			on_stock: null,
			price: 120,
			use_remains: false,
		},
		{
			active: true,
			available: true,
			expiration_date: "2026-08-10",
			id: 2,
			logo: null,
			name: "Coffee voucher",
			on_stock: 4,
			price: 80,
			use_remains: true,
		},
		{
			active: false,
			available: false,
			expiration_date: null,
			id: 3,
			logo: null,
			name: "Team mug",
			on_stock: 0,
			price: 40,
			use_remains: true,
		},
	],
};

function mockStorePageRequests() {
	cy.intercept("GET", GET_PROFILE_URL, { body: PROFILE_RESPONSE, statusCode: 200 }).as("getProfile");
	cy.intercept("GET", GET_TENANTS_URL, { body: TENANTS_RESPONSE, statusCode: 200 }).as("getTenants");
	cy.intercept("GET", GET_DONUTS_URL, (request) => {
		const page = Number(request.query.page || 1);

		request.reply({
			body: { data: page === 1 ? DONUTS_RESPONSE.data.slice(0, 2) : DONUTS_RESPONSE.data.slice(2) },
			headers: {
				"Access-Control-Expose-Headers": "Per-Page, Total",
				"Per-Page": "2",
				Total: "3",
			},
			statusCode: 200,
		});
	}).as("getDonuts");
	mockHeartbeatRequest();
}

describe("Store page", () => {
	runInViewports([TEST_VIEWPORTS.desktop, TEST_VIEWPORTS.mobile], () => {
		beforeEach(() => {
			mockStorePageRequests();
			cy.visitAuthorized("/store-manager");
			cy.wait("@getProfile");
			cy.wait("@getDonuts");
			cy.wait("@getDonuts");
		});

		it("shows the reward catalog and filters it by name and status", () => {
			cy.contains("h1", "Store showcase").should("be.visible");
			cy.contains('[aria-label="Store statistics"]', "Total rewards").parent().should("contain.text", "3");
			cy.get("@getDonuts.all").should("have.length", 2);
			cy.get('[data-testid="store-reward-card"]').should("have.length", 3);

			cy.get('input[name="store-reward-search"]').type("coffee");
			cy.get('[data-testid="store-reward-card"]').should("have.length", 1).and("contain.text", "Coffee voucher");

			cy.get('input[name="store-reward-search"]').clear();
			cy.contains('[role="tab"]', "Inactive").click();
			cy.get('[data-testid="store-reward-card"]').should("have.length", 1).and("contain.text", "Team mug");
		});
	});
});
