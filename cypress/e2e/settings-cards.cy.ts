/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { mockHeartbeatRequest } from "../support/api";
import { PROFILE_RESPONSE } from "../support/fixtures/profile-response";
import { runInViewports, TEST_VIEWPORTS } from "../support/viewports";

const GET_CIRCLES_URL = /\/api\/v1\/circles(?:\?.*)?$/;
const GET_PROFILE_URL = /\/api\/v1\/profile(?:\?.*)?$/;
const GET_TENANT_URL = /\/api\/v1\/tenant\/current(?:\?.*)?$/;
const SETTINGS_CONTENT_TIMEOUT = 10_000;

const CIRCLES_RESPONSE = {
	data: [
		{ attributes: { active: true, id: 1, name: "Engineering" }, id: "1", type: "circles" },
		{ attributes: { active: true, id: 2, name: "Product launch" }, id: "2", type: "circles" },
		{ attributes: { active: true, id: 3, name: "Culture crew" }, id: "3", type: "circles" },
	],
};

const TENANT_RESPONSE = {
	data: {
		attributes: {
			active: true,
			attached: true,
			birthday_donuts: 20,
			birthday_message: "Happy birthday!",
			birthday_points: 10,
			caption: "Avengers",
			created_at: "2026-01-01T00:00:00Z",
			deactivated: false,
			demo: false,
			domain: "avengers.example",
			email_notification: true,
			id: 1,
			join_to_company_donuts: 0,
			join_to_company_points: 0,
			join_to_project_donuts: 0,
			join_to_project_points: 0,
			logo: { thumb: { url: "" }, url: "" },
			name: "test-tenant",
			test: false,
			updated_at: "2026-01-01T00:00:00Z",
			use_departments: false,
			welcome_donuts: 50,
			welcome_points: 25,
		},
		id: "1",
		type: "tenants",
	},
};

function mockSettingsRequests() {
	cy.intercept("GET", /\/api\/v1\/.+/, { body: { data: [] }, statusCode: 200 });
	cy.intercept("GET", GET_PROFILE_URL, { body: PROFILE_RESPONSE, statusCode: 200 }).as("getProfile");
	cy.intercept("GET", GET_CIRCLES_URL, { body: CIRCLES_RESPONSE, statusCode: 200 }).as("getCircles");
	cy.intercept("GET", GET_TENANT_URL, { body: TENANT_RESPONSE, statusCode: 200 }).as("getTenant");
	mockHeartbeatRequest();
}

describe("Meaningful settings cards", () => {
	runInViewports([TEST_VIEWPORTS.desktop, TEST_VIEWPORTS.mobile], () => {
		beforeEach(() => {
			mockSettingsRequests();
		});

		it("shows circles as a searchable list with accessible actions", () => {
			cy.visitAuthorized("/circles");
			cy.wait("@getProfile");
			cy.wait("@getCircles");

			cy.contains("h1", "Team circles").should("be.visible");
			cy.contains("Circles help show which projects and areas each team member contributes to.").should("be.visible");
			cy.get('[data-testid="circle-list-item"]', { timeout: SETTINGS_CONTENT_TIMEOUT }).should("have.length", 3);

			cy.get('input[name="circle-search"]').type("engineering");
			cy.get('[data-testid="circle-list-item"]').should("have.length", 1).and("contain.text", "Engineering");
			cy.get('button[aria-label="Circle actions"]').click();
			cy.contains('[role="menuitem"]', "Rename circle").should("be.visible");
			cy.contains('[role="menuitem"]', "Delete circle").should("be.visible");
		});

		it("groups team settings by member outcome", () => {
			cy.visitAuthorized("/tenant");
			cy.wait("@getProfile");
			cy.wait("@getTenant");

			cy.contains("h1", "Team settings").should("be.visible");
			cy.get('input[name="caption"]', { timeout: SETTINGS_CONTENT_TIMEOUT }).should("have.value", "Avengers");
			cy.contains("h2", "Team identity").scrollIntoView().should("be.visible");
			cy.contains("h2", "Welcoming new members").scrollIntoView().should("be.visible");
			cy.contains("h2", "Birthday").scrollIntoView().should("be.visible");
			cy.get('[data-testid="form-submit-button"]').scrollIntoView().should("be.visible");
		});

		it("prevents saving settings while the team logo is uploading", () => {
			cy.intercept("PUT", GET_TENANT_URL, { body: TENANT_RESPONSE, delay: 1_000, statusCode: 200 }).as("updateTenantLogo");
			cy.visitAuthorized("/tenant");
			cy.wait("@getProfile");
			cy.wait("@getTenant");

			cy.get('input[type="file"]').selectFile(
				{
					contents: Cypress.Buffer.from("team logo"),
					fileName: "team-logo.png",
					mimeType: "image/png",
				},
				{ force: true }
			);

			cy.get('[data-testid="form-submit-button"]').should("be.disabled");
			cy.wait("@updateTenantLogo");
			cy.get('[data-testid="form-submit-button"]').should("be.enabled");
		});

		it("restores the persisted team logo when an upload fails", () => {
			cy.intercept("PUT", GET_TENANT_URL, { body: { error: "Invalid image" }, delay: 500, statusCode: 422 }).as("rejectTenantLogo");
			cy.visitAuthorized("/tenant");
			cy.wait("@getProfile");
			cy.wait("@getTenant");

			cy.get('input[type="file"]').selectFile(
				{
					contents: Cypress.Buffer.from("invalid team logo"),
					fileName: "invalid-team-logo.png",
					mimeType: "image/png",
				},
				{ force: true }
			);

			cy.get('button[aria-label="Change logo"] img')
				.should("have.attr", "src")
				.and("match", /^blob:/);
			cy.wait("@rejectTenantLogo");
			cy.get('button[aria-label="Change logo"] img').should("not.exist");
			cy.get('button[aria-label="Change logo"]').should("contain.text", "A");
		});
	});
});
