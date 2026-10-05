/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { mockGiveDonutsModalRequests, signInToDashboard } from "../support/dashboard-page";
import { runInViewports, TEST_VIEWPORTS } from "../support/viewports";

function sendDonutsFromDashboard() {
	signInToDashboard();

	cy.get("#root", { timeout: 12000 }).should(($root) => {
		expect($root.children().length).to.be.greaterThan(0);
	});
	cy.get('[data-testid="brand-gradient-action-button"]', { timeout: 12000 }).scrollIntoView().should("be.visible").and("contain.text", "Подарить пончики");
	mockGiveDonutsModalRequests();
	cy.get('[data-testid="brand-gradient-action-button"]').click();

	cy.contains(".MuiDialog-paper", "Доставка поничков").as("giveDonutsModal").should("be.visible");
	cy.wait("@getProfiles");
	cy.get("@giveDonutsModal").contains("Pepper Potts").should("be.visible").click();

	cy.wait("@getDistribAccount");
	cy.get("@giveDonutsModal").contains("Отправляем").should("contain.text", "Pepper Potts");
	cy.get("@giveDonutsModal").find(".MuiAvatar-root").should("be.visible");
	cy.get("@giveDonutsModal").contains("Допустимая сумма: от 1 до 12").should("be.visible");

	cy.get("@giveDonutsModal").find('input[name="amount"]').clear().type("0").blur();
	cy.get("@giveDonutsModal").contains("Минимальное значение - 1").should("be.visible");
	cy.get("@giveDonutsModal").find('[data-testid="form-submit-button"]').should("be.disabled");

	cy.get("@giveDonutsModal").find('input[name="amount"]').clear().type("13").blur();
	cy.get("@giveDonutsModal").contains("Максимальное значение - 12").should("be.visible");
	cy.get("@giveDonutsModal").find('[data-testid="form-submit-button"]').should("be.disabled");

	cy.get("@giveDonutsModal").find('input[name="amount"]').clear().type("12").blur();
	cy.get("@giveDonutsModal").find('textarea[name="comment"]').type("Thanks for keeping the team aligned.").blur();
	cy.get("@giveDonutsModal").find('[data-testid="form-submit-button"]').should("be.enabled").click();

	cy.wait("@postTransferDonuts");
	cy.get("@giveDonutsModal").contains("Пончики уже в пути").should("be.visible");
	cy.get("@giveDonutsModal").contains("button", "Закрыть").should("be.visible");
}

describe("Dashboard give donuts modal", () => {
	beforeEach(() => {
		cy.clearLocalStorage();
	});

	runInViewports([TEST_VIEWPORTS.desktop, TEST_VIEWPORTS.mobile], () => {
		it("sends donuts from the dashboard give donuts modal", () => {
			sendDonutsFromDashboard();
		});
	});
});
