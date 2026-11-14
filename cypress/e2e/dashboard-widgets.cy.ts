/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { DASHBOARD_PROFILE_RESPONSE, mockDashboardPageRequests } from "../support/dashboard-page";
import { runInViewports, TEST_VIEWPORTS } from "../support/viewports";

runInViewports([TEST_VIEWPORTS.desktop, TEST_VIEWPORTS.mobile], ({ isMobile }) => {
	for (const theme of ["light", "dark"]) {
		it(`shows real weekly recognition and the status inside balance in ${theme} theme`, () => {
			mockDashboardPageRequests();
			cy.visitAuthorized("/", { locale: "ru", visitOptions: { onBeforeLoad: (win) => win.localStorage.setItem("theme", theme) } });
			cy.wait("@getProfile");
			const sidebar = '[data-testid="dashboard-social-sidebar"]';
			cy.get(sidebar).children().should("have.length", 3);
			cy.get(sidebar).contains("Баланс").should("be.visible");
			if (isMobile) {
				cy.get(`${sidebar} button[aria-expanded="false"]`).each(($button) => cy.wrap($button).click());
			}
			cy.wait(["@getParticipationCurrentWeek", "@getParticipationWeeklyRecognitionCurrent", "@getWeeklyBadges"]);
			cy.get('[data-testid="dashboard-widget-your-status"]').should("contain.text", "Share donuts with a colleague");
			cy.get('[data-testid="dashboard-widget-your-status"] [role="progressbar"]').should("not.exist");
			cy.get('[data-testid="dashboard-widget-current-week-statistics"]').within(() => {
				for (const count of [4, 3, 2, 5]) cy.contains("h6", String(count)).scrollIntoView().should("be.visible");
			});
			cy.get('[data-testid="dashboard-widget-leaderboard"]').should("contain.text", "Bruce Wayne").and("contain.text", "Recognition Rocket");
			cy.get(sidebar).should(($sidebar) => {
				expect($sidebar[0].scrollWidth).to.be.at.most($sidebar[0].clientWidth + 1);
			});
			cy.screenshot(`widgets-${isMobile ? "mobile" : "desktop"}-${theme}`);
			cy.intercept("GET", /\/donuts(?:\?.*)?$/, { statusCode: 200, headers: { "Per-Page": "24", Total: "0" }, body: { data: [] } }).as("getStoreDonuts");
			cy.get('[data-testid="dashboard-widget-balance-overview"] a').should("have.attr", "href", "/donuts").scrollIntoView().click();
			cy.location("pathname").should("eq", "/donuts");
		});
	}
	it("keeps status available without accounts", () => {
		mockDashboardPageRequests();
		cy.intercept("GET", /\/profile(?:\?.*)?$/, {
			statusCode: 200,
			body: { ...DASHBOARD_PROFILE_RESPONSE, data: { ...DASHBOARD_PROFILE_RESPONSE.data, attributes: { ...DASHBOARD_PROFILE_RESPONSE.data.attributes, self_account: null, distrib_account: null } } },
		}).as("getProfileWithoutAccounts");
		cy.visitAuthorized("/", { locale: "ru" });
		cy.wait("@getProfileWithoutAccounts");
		if (isMobile) cy.get('[data-testid="dashboard-social-sidebar"]').children().eq(1).find('button[aria-expanded="false"]').click();
		cy.get('[data-testid="dashboard-widget-balance-overview"]').should("not.exist");
		cy.get('[data-testid="dashboard-widget-your-status"]').should("be.visible");
	});
});
