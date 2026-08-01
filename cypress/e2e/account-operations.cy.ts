/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { mockAccountOperationsPageRequests } from "../support/account-operations-page";
import { runInViewports, TEST_VIEWPORTS } from "../support/viewports";

describe("Account operations", () => {
	runInViewports([TEST_VIEWPORTS.desktop, TEST_VIEWPORTS.mobile], ({ isMobile }) => {
		beforeEach(() => {
			mockAccountOperationsPageRequests();
			cy.visitAuthorized("/account_operations/1");
			cy.wait("@getProfile");
			cy.get('[data-testid="account-operations-page"]', { timeout: 12000 }).should("be.visible");
			cy.wait(["@getAccountOperationsHistory", "@getAccountOperationsSummary"]);
		});

		it("shows the unified operation summary and history", () => {
			cy.get('[data-testid="account-operations-page"]').should("be.visible");
			cy.get('[data-testid="account-operations-summary"]').should("contain.text", "125").and("contain.text", "+29").and("contain.text", "+7");
			cy.get('[data-testid="account-operation-row"]').should("have.length", 3);
			cy.contains("Refund for Hoodie Bonuts").should("be.visible");
			cy.contains("Balance now").should("not.exist");
		});

		it("applies account, operation, search, and period filters", () => {
			if (isMobile) cy.get('button[aria-label="Operation filters"]').click();

			cy.get('[data-testid="account-type-coin"]').click();
			cy.wait("@getAccountOperationsHistory").its("request.query.account_type").should("eq", "self");

			cy.get('[data-testid="operation-filter-purchase"]').click();
			cy.wait("@getAccountOperationsHistory").its("request.query.operation_type").should("eq", "purchase");

			cy.get('input[name="account-operations-search"]').type("Hoodie");
			cy.wait("@getAccountOperationsHistory").its("request.query.search").should("eq", "Hoodie");

			cy.get('[data-testid="period-filter-30-days"]').click();
			cy.wait("@getAccountOperationsHistory").its("request.query.date_from").should("be.a", "string").and("not.be.empty");
		});
	});
});
