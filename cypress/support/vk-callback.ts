/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress support */

import { PROFILE_RESPONSE } from "./fixtures/profile-response";

export const CALLBACK_QUERY = "?code=test-code&state=test-state&deviceId=test-device";

export const VK_CALLBACK_PAYLOAD = {
	code: "test-code",
	state: "test-state",
	device_id: "test-device",
	code_verifier: "test-verifier",
};

type TVkCallbackSettings = Record<string, unknown> & {
	auth_token?: string;
	tenant?: string;
	locale?: string;
};

export function visitVkCallback(settings: Record<string, unknown>, options: Partial<Cypress.VisitOptions> = {}) {
	const { auth_token, locale = "en", tenant, ...extraSettings } = settings as TVkCallbackSettings;
	const callbackSettings = {
		"vk-code-verifier": "test-verifier",
		...extraSettings,
	};

	if (auth_token || tenant) {
		return cy.visitAuthorized(`/oauth/vk${CALLBACK_QUERY}`, {
			auth_token,
			tenant,
			locale,
			settings: callbackSettings,
			visitOptions: {
				...options,
			},
		});
	}

	return cy.visit(`/oauth/vk${CALLBACK_QUERY}`, {
		...options,
		onBeforeLoad(win) {
			win.localStorage.setItem(
				"settings",
				JSON.stringify({
					locale,
					...callbackSettings,
				})
			);

			options.onBeforeLoad?.(win);
		},
	});
}

export function mockVkProfileRequest() {
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
}

export function mockVkLoginRequest() {
	cy.intercept("POST", "**/vk/login", {
		statusCode: 200,
		body: {
			auth_token: "vk-auth-token",
			currentTenant: "test-tenant",
			tenants: [{ name: "test-tenant" }],
		},
	}).as("vkLogin");
}

export function mockVkConnectRequest() {
	cy.intercept("POST", "**/vk/connect", {
		statusCode: 200,
		body: {
			vk_user_id: "12345",
		},
	}).as("vkConnect");
}
