/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { mockHeartbeatRequest } from "../support/api";
import { PROFILE_RESPONSE } from "../support/fixtures/profile-response";
import { runInViewports, TEST_VIEWPORTS } from "../support/viewports";

const GET_DONUTS_URL = /\/api\/v1\/donuts(?:\?.*)?$/;
const GET_DONUT_URL = /\/api\/v1\/donuts\/2(?:\?.*)?$/;
const GET_SELF_ACCOUNT_URL = /\/api\/v1\/accounts\/10(?:\?.*)?$/;
const GET_PROFILE_URL = /\/profile(?:\?.*)?$/;
const GET_TENANTS_URL = /\/tenants(?:\?.*)?$/;
const POST_REQUEST_URL = /\/api\/v1\/requests$/;

const DONUTS_PROFILE_RESPONSE = {
	...PROFILE_RESPONSE,
	data: {
		...PROFILE_RESPONSE.data,
		attributes: {
			...PROFILE_RESPONSE.data.attributes,
			self_account: { id: 10, profile_id: 1 },
		},
	},
};

const SELF_ACCOUNT_RESPONSE = {
	data: {
		attributes: { balance: 100, id: 10, type: "self" },
		id: "10",
		type: "accounts",
	},
};

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
			description: "Wear the team colors.",
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
			description: "Enjoy a coffee break.",
			expiration_date: null,
			id: 2,
			logo: null,
			name: "Coffee voucher",
			on_stock: 4,
			price: 80,
			use_remains: true,
		},
		{
			active: true,
			available: false,
			description: null,
			expiration_date: null,
			id: 3,
			logo: null,
			name: "Team mug",
			on_stock: 0,
			price: 40,
			use_remains: true,
		},
		{
			active: true,
			available: true,
			description: "Malformed API reward without a name.",
			expiration_date: null,
			id: 4,
			logo: null,
			on_stock: 1,
			price: 10,
			use_remains: true,
		},
	],
};

function mockDonutsPageRequests() {
	cy.intercept("GET", GET_PROFILE_URL, { body: DONUTS_PROFILE_RESPONSE, statusCode: 200 }).as("getProfile");
	cy.intercept("GET", GET_TENANTS_URL, { body: TENANTS_RESPONSE, statusCode: 200 }).as("getTenants");
	cy.intercept("GET", GET_SELF_ACCOUNT_URL, { body: SELF_ACCOUNT_RESPONSE, statusCode: 200 }).as("getSelfAccount");
	cy.intercept("GET", GET_DONUTS_URL, (request) => {
		const page = Number(request.query.page || 1);

		request.reply({
			body: { data: page === 1 ? DONUTS_RESPONSE.data.slice(0, 2) : DONUTS_RESPONSE.data.slice(2) },
			headers: {
				"Access-Control-Expose-Headers": "Per-Page, Total",
				"Per-Page": "2",
				Total: "4",
			},
			statusCode: 200,
		});
	}).as("getDonuts");
	cy.intercept("GET", GET_DONUT_URL, { body: { data: DONUTS_RESPONSE.data[1] }, statusCode: 200 }).as("getDonut");
	cy.intercept("POST", POST_REQUEST_URL, { body: { data: [] }, statusCode: 201 }).as("postRequest");
	mockHeartbeatRequest();
}

describe("Donuts page", () => {
	runInViewports([TEST_VIEWPORTS.desktop, TEST_VIEWPORTS.mobile], () => {
		beforeEach(() => {
			mockDonutsPageRequests();
			cy.visitAuthorized("/donuts");
			cy.wait("@getProfile");
			cy.wait("@getDonuts");
			cy.wait("@getSelfAccount");
		});

		it("shows and filters the reward catalog", () => {
			cy.get('[data-testid="donut-card"]').should("have.length", 2);
			cy.get('[data-testid="infinite-scroll-trigger"]').scrollIntoView();
			cy.wait("@getDonuts");
			cy.get('[data-testid="donut-card"]').should("have.length", 3);
			cy.get("@getDonuts.all").should("have.length", 2);
			cy.contains('[data-testid="donut-card"]', "Coffee voucher").should("contain.text", "80").and("contain.text", "4");

			cy.get('input[name="donut-search"]').type("coffee");
			cy.get('[data-testid="donut-card"]').should("have.length", 1).and("contain.text", "Coffee voucher");
		});

		it("opens the selected reward", () => {
			cy.contains('[data-testid="donut-card"]', "Coffee voucher").click();
			cy.location("pathname").should("eq", "/d/2");
			cy.wait("@getDonut");
		});

		it("purchases an affordable reward directly from its card", () => {
			cy.contains('[data-testid="donut-card"]', "Coffee voucher").find('[data-testid="donut-purchase-button"]').should("be.visible");
			cy.contains('[data-testid="donut-card"]', "Hoodie Bonuts").find('[data-testid="donut-purchase-button"]').should("not.exist");
			cy.contains('[data-testid="donut-card"]', "Coffee voucher").find('[data-testid="donut-purchase-button"]').click();

			cy.wait("@postRequest").its("request.body").should("deep.include", { donut_id: 2, tenant: "test-tenant" });
			cy.contains('[data-testid="donut-card"]', "Coffee voucher").find('[data-testid="donut-purchase-confirmation"]').should("be.visible");
			cy.location("pathname").should("eq", "/donuts");
		});
	});
});
