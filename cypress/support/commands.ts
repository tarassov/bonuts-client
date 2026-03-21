/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress command */

type TMockAuthOptions = {
	auth_token?: string;
	tenant?: string;
	locale?: string;
};

declare global {
	namespace Cypress {
		interface Chainable {
			mockAuthorization(options?: TMockAuthOptions): Chainable<void>;
			visitAuthorized(url: string, options?: TMockAuthOptions): Chainable<AUTWindow>;
		}
	}
}

const DEFAULT_AUTH_OPTIONS: Required<TMockAuthOptions> = {
	auth_token: "test-auth-token",
	tenant: "test-tenant",
	locale: "en",
};

Cypress.Commands.add("mockAuthorization", (options: TMockAuthOptions = {}) => {
	const settings = {
		...DEFAULT_AUTH_OPTIONS,
		...options,
	};

	cy.window().then((win) => {
		win.localStorage.setItem("settings", JSON.stringify(settings));
	});
});

Cypress.Commands.add("visitAuthorized", (url: string, options: TMockAuthOptions = {}) => {
	const settings = {
		...DEFAULT_AUTH_OPTIONS,
		...options,
	};

	return cy.visit(url, {
		onBeforeLoad(win) {
			win.localStorage.setItem("settings", JSON.stringify(settings));
		},
	});
});

export {};
