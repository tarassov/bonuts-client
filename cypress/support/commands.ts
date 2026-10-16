/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress command */

type TAuthorizationOptions = {
	auth_token?: string;
	tenant?: string;
	locale?: string;
	settings?: Record<string, unknown>;
	visitOptions?: Partial<Cypress.VisitOptions>;
};

type TAuthorizationSettings = Pick<TAuthorizationOptions, "auth_token" | "tenant" | "locale">;

declare global {
	namespace Cypress {
		interface Chainable {
			mockAuthorization(options?: TAuthorizationOptions): Chainable<void>;
			visitAuthorized(url: string, options?: TAuthorizationOptions): Chainable<AUTWindow>;
		}
	}
}

const DEFAULT_AUTH_OPTIONS: Required<TAuthorizationSettings> = {
	auth_token: "test-auth-token",
	tenant: "test-tenant",
	locale: "en",
};

function buildAuthorizationSettings(options: TAuthorizationOptions = {}) {
	const { settings = {}, visitOptions: _visitOptions, ...authOptions } = options;

	return {
		...DEFAULT_AUTH_OPTIONS,
		...authOptions,
		...settings,
	};
}

Cypress.Commands.add("mockAuthorization", (options: TAuthorizationOptions = {}) => {
	const settings = {
		...buildAuthorizationSettings(options),
	};

	cy.window().then((win) => {
		win.localStorage.clear();
		win.localStorage.setItem("settings", JSON.stringify(settings));
	});
});

Cypress.Commands.add("visitAuthorized", (url: string, options: TAuthorizationOptions = {}) => {
	const { visitOptions = {} } = options;
	const settings = buildAuthorizationSettings(options);

	return cy.visit(url, {
		...visitOptions,
		onBeforeLoad(win) {
			win.localStorage.clear();
			win.localStorage.setItem("settings", JSON.stringify(settings));
			visitOptions.onBeforeLoad?.(win);
		},
	});
});

export {};
