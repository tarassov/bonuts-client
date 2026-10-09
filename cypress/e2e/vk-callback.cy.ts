/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { mockVkConnectRequest, mockVkLoginRequest, mockVkProfileRequest, VK_CALLBACK_PAYLOAD, visitVkCallback } from "../support/vk-callback";

describe("VK callback page", () => {
	describe("route access", () => {
		it("allows anonymous users to open callback page for VK login", () => {
			mockVkLoginRequest();

			visitVkCallback({
				"vk-auth-flow": "login",
			});

			cy.url().should("include", "/oauth/vk");
			cy.url().should("not.include", "/login");
			cy.get('[data-testid="vk-callback-page"]').should("be.visible");
			cy.get('[data-testid="vk-callback-title"]').should("not.be.empty");
		});

		it("allows authenticated users to open callback page for VK connect", () => {
			mockVkProfileRequest();
			mockVkConnectRequest();

			visitVkCallback({
				auth_token: "test-auth-token",
				tenant: "test-tenant",
				"vk-auth-flow": "connect",
			});

			cy.url().should("include", "/oauth/vk");
			cy.url().should("not.eq", `${Cypress.config("baseUrl")}/`);
			cy.get('[data-testid="vk-callback-page"]').should("be.visible");
			cy.get('[data-testid="vk-callback-title"]').should("not.be.empty");
		});
	});

	describe("callback side effects", () => {
		it("sends login payload for anonymous VK auth", () => {
			mockVkLoginRequest();

			visitVkCallback({
				"vk-auth-flow": "login",
			});

			cy.wait("@vkLogin").then((interception) => {
				expect(interception.request.body).to.deep.include(VK_CALLBACK_PAYLOAD);
			});
		});

		it("sends connect payload for authenticated VK auth", () => {
			mockVkProfileRequest();
			mockVkConnectRequest();

			visitVkCallback({
				auth_token: "test-auth-token",
				tenant: "test-tenant",
				"vk-auth-flow": "connect",
			});

			cy.wait("@vkConnect").then((interception) => {
				expect(interception.request.body).to.deep.include(VK_CALLBACK_PAYLOAD);
			});
		});
	});
});
