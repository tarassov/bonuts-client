describe("Login page", () => {
	it("renders login form fields and submit button", () => {
		cy.visit("/login");

		cy.url().should("include", "/login");
		cy.get("#email").should("be.visible");
		cy.get("#password").should("be.visible");
		cy.get('button[type="submit"]').should("be.visible");
	});
});
