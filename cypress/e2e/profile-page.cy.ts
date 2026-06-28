/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { PROFILE_RESPONSE } from "../support/fixtures/profile-response";
import { runInViewports, TEST_VIEWPORTS } from "../support/viewports";

const GET_PROFILE_URL = /\/profile(?:\?.*)?$/;
const GET_CIRCLES_URL = /\/circles(?:\?.*)?$/;
const GET_PROFILE_PICTURES_URL = /\/profiles\/\d+\/profile_pictures(?:\?.*)?$/;
const GET_TENANTS_URL = /\/tenants(?:\?.*)?$/;
const POST_HEARTBEAT_URL = /\/user_activity\/heartbeat(?:\?.*)?$/;
const DELETE_PROFILE_PICTURE_URL = /\/profile_pictures\/\d+(?:\?.*)?$/;

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

const TENANTS_RESPONSE = {
	data: [
		{
			id: "1",
			type: "tenants",
			attributes: {
				name: "test-tenant",
				caption: "Test tenant",
				active_users_count: 1,
				logo: null,
			},
		},
	],
};

const PROFILE_PICTURES_RESPONSE = {
	data: [
		{
			id: 11,
			caption: null,
			profile_id: 1,
			user_id: 101,
			image: {
				url: "https://example.com/photos/tony-1.jpg",
				thumb: { url: "https://example.com/photos/tony-1-thumb.jpg" },
				preview: { url: "https://example.com/photos/tony-1-preview.jpg" },
			},
			likes_count: 0,
			comments_count: 0,
			liked: false,
			comments: [],
			created_at: "2026-01-01T00:00:00.000Z",
			updated_at: "2026-01-01T00:00:00.000Z",
		},
		{
			id: 12,
			caption: null,
			profile_id: 1,
			user_id: 202,
			image: {
				url: "https://example.com/photos/pepper-1.jpg",
				thumb: { url: "https://example.com/photos/pepper-1-thumb.jpg" },
				preview: { url: "https://example.com/photos/pepper-1-preview.jpg" },
			},
			likes_count: 0,
			comments_count: 0,
			liked: false,
			comments: [],
			created_at: "2026-01-02T00:00:00.000Z",
			updated_at: "2026-01-02T00:00:00.000Z",
		},
	],
};

function mockProfilePageRequests() {
	let profilePictures = structuredClone(PROFILE_PICTURES_RESPONSE);

	cy.intercept(
		{ method: "GET", url: GET_TENANTS_URL },
		{
			statusCode: 200,
			body: TENANTS_RESPONSE,
		}
	).as("getTenants");

	cy.intercept({ method: "GET", url: GET_PROFILE_URL }, (request) => {
		if (request.query.tenant !== "test-tenant") {
			request.continue();
			return;
		}

		request.reply({
			statusCode: 200,
			body: PROFILE_RESPONSE,
		});
	}).as("getProfile");

	cy.intercept({ method: "GET", url: GET_CIRCLES_URL }, (request) => {
		if (request.query.tenant !== "test-tenant") {
			request.continue();
			return;
		}

		request.reply({
			statusCode: 200,
			body: CIRCLES_RESPONSE,
		});
	}).as("getCircles");

	cy.intercept({ method: "GET", url: GET_PROFILE_PICTURES_URL }, (request) => {
		if (request.query.tenant !== "test-tenant") {
			request.continue();
			return;
		}

		request.reply({
			statusCode: 200,
			body: profilePictures,
		});
	}).as("getProfilePictures");

	cy.intercept({ method: "DELETE", url: DELETE_PROFILE_PICTURE_URL }, (request) => {
		const photoId = Number(String(request.url).match(/\/profile_pictures\/(\d+)/)?.[1]);

		profilePictures = {
			data: profilePictures.data.filter((photo) => photo.id !== photoId),
		};

		request.reply({
			statusCode: 200,
			body: { success: true },
		});
	}).as("deleteProfilePicture");

	cy.intercept(
		{ method: "POST", url: POST_HEARTBEAT_URL },
		{
			statusCode: 200,
			body: {},
		}
	).as("postHeartbeat");
}

function visitProfilePage() {
	mockProfilePageRequests();

	cy.visitAuthorized("/my");
	cy.location("pathname").should("eq", "/my");

	cy.wait("@getProfile");
	cy.wait("@getCircles");
	cy.wait("@getProfilePictures");
}

describe("Profile page", () => {
	runInViewports([TEST_VIEWPORTS.desktop, TEST_VIEWPORTS.mobile], ({ isMobile }) => {
		it("renders the new profile layout with header, statuses and form sections", () => {
			visitProfilePage();

			cy.get('[data-testid="profile-header"]').should("be.visible");
			cy.get('[data-testid="profile-header"]').within(() => {
				cy.contains(/tony stark/i).should("be.visible");
				cy.contains("Iron Man").should("be.visible");
			});

			cy.get('[data-testid="profile-header-statuses"]').within(() => {
				cy.get('[class*="MuiChip-root"]').should("have.length", 2);
			});

			cy.contains("Main information").scrollIntoView().should("be.visible");
			cy.contains("Contacts").scrollIntoView().should("be.visible");
			cy.contains("Additional information").scrollIntoView().should("be.visible");
			cy.contains("Genius, billionaire, philanthropist.").scrollIntoView().should("be.visible");
			cy.get('[data-testid="profile-locale-card"]').scrollIntoView().should("be.visible");

			if (!isMobile) {
				cy.get('[id="user-profile|circles"]')
					.closest(".MuiAutocomplete-root")
					.should(($el) => {
						expect($el.outerWidth() || 0).to.be.greaterThan(200);
					});
			}
		});

		it("opens the album modal and allows deleting only own photos", () => {
			visitProfilePage();

			cy.get('[data-testid="photo-album-tile-0"]').scrollIntoView().should("be.visible").click();

			cy.get('[data-testid="photo-album-viewer"]').should("be.visible");
			cy.get('[data-testid="profile-photo-delete"]').should("be.visible").click();
			cy.wait("@deleteProfilePicture");

			cy.get('[data-testid="photo-album-viewer"]').within(() => {
				cy.contains("1 / 1").should("be.visible");
			});
			cy.get('[data-testid="profile-photo-delete"]').should("not.exist");
			cy.get('[data-testid="photo-album-close"]').click();

			cy.get('[data-testid="photo-album-tile-0"]').scrollIntoView().should("be.visible");
			cy.get('[data-testid^="photo-album-tile-"]').should("have.length", 1);
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
