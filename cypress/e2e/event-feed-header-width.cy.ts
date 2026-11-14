/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { mockDashboardPageRequests } from "../support/dashboard-page";

it("adapts the header to the feed width with the navigation drawer open", () => {
	cy.viewport(900, 720);
	mockDashboardPageRequests();
	cy.visitAuthorized("/", { locale: "ru" });
	cy.wait(["@getProfile", "@getPinnedEvents", "@getCurrentTenant", "@getEvents"]);
	cy.get(".MuiDrawer-paper button").first().click();
	cy.get(".MuiDrawer-paper").should("have.css", "width", "240px");

	for (const width of [900, 1100, 1600]) {
		cy.viewport(width, 720);
		cy.get('[data-testid="event-feed-header"]')
			.as("header")
			.should(($header) => {
				const header = $header[0];
				const rect = header.getBoundingClientRect();
				const feed = header.closest('[data-testid="dashboard-event-feed"]').getBoundingClientRect();
				expect(rect.right).to.be.at.most(feed.right + 1);
				expect(header.scrollWidth).to.be.at.most(header.clientWidth);
				expect(rect.height).to.be.at.most(64);
				for (const button of header.querySelectorAll("button")) {
					if (!button.getClientRects().length) continue;
					const bounds = button.getBoundingClientRect();
					expect(bounds.left).to.be.at.least(rect.left - 1);
					expect(bounds.right).to.be.at.most(rect.right + 1);
					expect(button.scrollWidth).to.be.at.most(button.clientWidth);
				}
			});
		cy.get('[data-testid="event-feed-give-button"]').should(($button) => {
			expect($button[0].innerText.trim()).to.eq(width < 1600 ? "Подарить" : "Подарить пончики");
		});
		cy.get("@header").then(($header) => {
			if ($header[0].getBoundingClientRect().width < 660) cy.wrap($header).find('button[aria-label="Поиск"]').click();
			else cy.wrap($header).find("input").focus();
		});
		cy.get("@header").find("input").should("be.focused");
		cy.get("@header")
			.contains("button", "Все записи")
			.should(width < 1600 ? "not.be.visible" : "be.visible");
		cy.get("@header").should(($header) => {
			expect($header[0].scrollWidth).to.be.at.most($header[0].clientWidth);
		});
		cy.get("@header").find('button[aria-label="Закрыть поиск"]').click();
		cy.get("@header").then(($header) => {
			cy.wrap($header)
				.find("input")
				.should($header[0].getBoundingClientRect().width >= 660 ? "be.visible" : "not.be.visible");
		});
		cy.get("@header").contains("button", "Все записи").should("be.visible");
	}
	cy.get("@header").find("input").focus().type("Спасибо");
	cy.viewport(900, 720);
	cy.get("@header").find("input").should("be.visible").and("have.value", "Спасибо").type("{esc}");
	cy.get("@header").contains("button", "Все записи").should("be.visible");
});
