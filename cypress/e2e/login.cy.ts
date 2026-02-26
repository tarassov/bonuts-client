/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */
describe("Login page", () => {
	it("renders login form fields and submit button", () => {
		cy.visit("/login");

		cy.url().should("include", "/login");
		cy.get("#email").should("be.visible");
		cy.get("#password").should("be.visible");
		cy.get('button[type="submit"]').should("be.visible");
	});

	it("redirects to dashboard after successful login", () => {
		cy.intercept("POST", "**/authenticate", {
			statusCode: 200,
			body: {
				auth_token: "test-auth-token",
				currentTenant: "test-tenant",
				tenants: [{ name: "test-tenant" }],
			},
		}).as("loginRequest");

		cy.visit("/login");
		cy.get("#email").type("test@example.com");
		cy.get("#password").type("password123");
		cy.get('button[type="submit"]').click();

		cy.wait("@loginRequest");
		cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
	});
});
