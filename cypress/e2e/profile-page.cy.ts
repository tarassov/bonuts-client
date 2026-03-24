/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { PROFILE_RESPONSE } from "../support/fixtures/profile-response";
import { runInViewports, TEST_VIEWPORTS } from "../support/viewports";

const CIRCLES_RESPONSE = {
	data: [
		{
			id: "1",
			type: "circles",
			attributes: {
				id: 1,
				name: "Avengers",
				active: true,
			},
		},
		{
			id: "2",
			type: "circles",
			attributes: {
				id: 2,
				name: "R&D",
				active: true,
			},
		},
	],
};

function mockProfilePageRequests() {
	cy.intercept("GET", "**/profile*", (request) => {
		if (request.query.tenant !== "test-tenant") {
			request.continue();
			return;
		}

		request.reply({
			statusCode: 200,
			body: PROFILE_RESPONSE,
		});
	}).as("getProfile");

	cy.intercept("GET", "**/circles*", (request) => {
		if (request.query.tenant !== "test-tenant") {
			request.continue();
			return;
		}

		request.reply({
			statusCode: 200,
			body: CIRCLES_RESPONSE,
		});
	}).as("getCircles");
}

function visitProfilePage() {
	mockProfilePageRequests();

	cy.visitAuthorized("/my");

	cy.wait("@getProfile");
	cy.wait("@getCircles");
}

describe("Profile page", () => {
	runInViewports([TEST_VIEWPORTS.desktop, TEST_VIEWPORTS.mobile], ({ isMobile }) => {
		it("renders the new profile layout with header, statuses and form sections", () => {
			visitProfilePage();

			cy.get('[data-testid="profile-header"]').should("be.visible");
			cy.contains("Tony Stark").should("be.visible");
			cy.contains("Iron Man").should("be.visible");

			cy.get('[data-testid="profile-header-statuses"]').within(() => {
				cy.contains("admin").should("be.visible");
				cy.contains("store admin").should("be.visible");
			});

			cy.contains("Main information").scrollIntoView().should("be.visible");
			cy.contains("Contacts").scrollIntoView().should("be.visible");
			cy.contains("About myself").scrollIntoView().should("be.visible");
			cy.contains("Additional information").scrollIntoView().should("be.visible");
			cy.get('[data-testid="profile-locale-card"]').scrollIntoView().should("be.visible");

			if (!isMobile) {
				cy.get('[id="user-profile|circles"]')
					.closest(".MuiAutocomplete-root")
					.should(($el) => {
						expect($el.outerWidth() || 0).to.be.greaterThan(200);
					});
			}
		});
	});

	describe("[mobile]", () => {
		beforeEach(() => {
			cy.viewport(TEST_VIEWPORTS.mobile.value);
		});

		it("places locale above the form and keeps save actions visible after edits", () => {
			visitProfilePage();

			cy.get('[data-testid="profile-header"]').then(($header) => {
				const headerTop = $header[0].getBoundingClientRect().top;

				cy.get('[data-testid="profile-locale-card"]').then(($locale) => {
					const localeTop = $locale[0].getBoundingClientRect().top;

					cy.contains("Main information").then(($sectionTitle) => {
						const sectionTop = $sectionTitle ? ($sectionTitle[0] as Element).getBoundingClientRect().top : null;

						expect(localeTop).to.be.greaterThan(headerTop);
						expect(localeTop).to.be.lessThan(sectionTop);
					});
				});
			});

			cy.get('[id="user-profile|first_name"]').clear().type("Anthony");

			cy.get('[data-testid="profile-form-submit"]')
				.should("be.visible")
				.and(($el) => {
					expect(getComputedStyle($el[0]).position).to.eq("sticky");
				});

			cy.get('[data-testid="form-cancel-button"]').should("be.visible");
			cy.get('[data-testid="form-submit-button"]').should("be.visible");
		});
	});
});
