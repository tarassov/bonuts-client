/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { DASHBOARD_EVENTS_RESPONSE, mockDashboardPageRequests } from "../support/dashboard-page";
import { runInViewports, TEST_VIEWPORTS } from "../support/viewports";

runInViewports([TEST_VIEWPORTS.desktop, { name: "narrow", value: { width: 320, height: 720 } }], () => {
	for (const theme of ["light", "dark"]) {
		it(`keeps recognition readable and the desktop sidebar stationary in ${theme} theme`, () => {
			mockDashboardPageRequests();
			cy.intercept("GET", /\/events(?:\?.*)?$/, {
				statusCode: 200,
				headers: { "Per-Page": "12", Total: "12" },
				body: {
					data: Array.from({ length: 12 }, (_, index) => ({
						...DASHBOARD_EVENTS_RESPONSE.data[0],
						id: String(200 + index),
						attributes: {
							...DASHBOARD_EVENTS_RESPONSE.data[0].attributes,
							id: 200 + index,
							public: true,
							user_name: "Александра Константинопольская",
							position: "Поддержка команды",
							content: "Спасибо за помощь с запуском проекта! Благодаря тебе команда справилась вовремя.",
							operation: {
								id: 200 + index,
								deal_type: "share",
								amount: 5,
								direction: 1,
								to_profile: { id: 2, name: "Константин Александровский", position: "Разработчик" },
							},
						},
					})),
				},
			}).as("getEvents");
			cy.visitAuthorized("/", {
				locale: "ru",
				visitOptions: { onBeforeLoad: (win) => win.localStorage.setItem("theme", theme) },
			});
			cy.wait(["@getProfile", "@getPinnedEvents", "@getCurrentTenant", "@getEvents"]);
			cy.get('[data-testid="event-card-public"]').first().as("card").scrollIntoView().should("be.visible");
			cy.get("@card").find('[data-testid="event-recognition-header"]').should("contain.text", "+5");
			cy.get("@card").contains("button", "Александра Константинопольская").should("be.visible");
			cy.get("@card").contains("button", "Константин Александровский").should("be.visible");
			cy.get("@card").should(($card) => {
				for (const element of [$card[0], ...$card[0].querySelectorAll("button")]) {
					expect(element.scrollWidth).to.be.at.most(element.clientWidth + 1);
				}
			});
			cy.screenshot(`recognition-${theme}`);
			cy.window().then((win) => {
				if (win.innerWidth < 900) return;
				cy.get('[data-testid="dashboard-social-sidebar"]').then(($sidebar) => {
					const top = $sidebar[0].getBoundingClientRect().top;
					cy.get('[data-testid="dashboard-event-list"] .scroll').scrollTo(0, 500);
					cy.get('[data-testid="dashboard-social-sidebar"]').should(($after) => {
						expect($after[0].getBoundingClientRect().top).to.eq(top);
					});
				});
			});
		});
	}
});
