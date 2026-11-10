/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress test */

import { DASHBOARD_EVENTS_RESPONSE, mockDashboardPageRequests } from "../support/dashboard-page";
import { runInViewports, TEST_VIEWPORTS } from "../support/viewports";

runInViewports([TEST_VIEWPORTS.desktop, TEST_VIEWPORTS.mobile, { name: "narrow", value: { width: 320, height: 720 } }], () => {
	it("keeps navigation, search and giving in one compact row", () => {
		mockDashboardPageRequests();
		cy.visitAuthorized("/", {
			locale: "ru",
			visitOptions: {
				onBeforeLoad(win) {
					win.localStorage.setItem("theme", "light");
				},
			},
		});
		cy.wait(["@getProfile", "@getPinnedEvents", "@getCurrentTenant", "@getEvents"]);
		cy.get('[data-testid="event-feed-header"]').as("header").scrollIntoView().should("be.visible");
		cy.get("@header").should(($header) => {
			const rect = $header[0].getBoundingClientRect();
			expect(rect.height).to.be.at.most(50);
			expect($header[0].scrollWidth).to.be.at.most($header[0].clientWidth);
			for (const button of $header[0].querySelectorAll("button")) {
				const buttonRect = button.getBoundingClientRect();
				expect(buttonRect.left).to.be.at.least(rect.left);
				expect(buttonRect.right).to.be.at.most(rect.right + 1);
			}
		});
		cy.get("@header").contains("button", "Все записи").should("have.attr", "aria-pressed", "true");
		cy.get("@header").contains("button", "С моим участием").click().should("have.attr", "aria-pressed", "true");
		cy.get("@header").find('[data-testid="event-feed-give-button"]').should("be.visible").and("have.css", "height", "40px");
		cy.wait("@getEvents");
		cy.get("@header").contains("button", "С моим участием").blur();
		cy.screenshot("feed-header-closed");

		cy.get("@header").find('button[aria-label="Поиск"]').click();
		cy.get("@header").find('input[aria-label="Поиск"]').should("be.focused").type("Спасибо");
		cy.get("@header").should(($header) => {
			expect($header[0].scrollWidth).to.be.at.most($header[0].clientWidth);
			expect($header[0].getBoundingClientRect().height).to.be.at.most(50);
		});
		cy.get("@header").find('[data-testid="event-feed-give-button"]').should("be.visible");
		cy.screenshot("feed-header-search");
		cy.get("@header").find("input").type("{esc}");
		cy.get("@header").find("input").should("not.exist");
		cy.get("@header").contains("button", "С моим участием").should("be.visible");
		cy.get("@header").find('button[aria-label="Поиск"]').should("be.focused");
	});
	it("shows a local loader for a slow filter and allows returning before it finishes", () => {
		mockDashboardPageRequests();
		cy.intercept("GET", /\/events(?:\?.*)?$/, {
			statusCode: 200,
			headers: { "Per-Page": "30", Total: "30" },
			body: {
				data: Array.from({ length: 30 }, (_, index) => ({
					...DASHBOARD_EVENTS_RESPONSE.data[0],
					id: String(101 + index),
					attributes: { ...DASHBOARD_EVENTS_RESPONSE.data[0].attributes, id: 101 + index },
				})),
			},
		}).as("getEvents");
		cy.intercept("GET", /\/events\/pinned(?:\?.*)?$/, { statusCode: 200, body: DASHBOARD_EVENTS_RESPONSE }).as("getPinnedEvents");
		cy.visitAuthorized("/", { locale: "ru" });
		cy.wait(["@getProfile", "@getPinnedEvents", "@getCurrentTenant", "@getEvents"]);
		cy.get('[data-testid="event-feed-header"]').as("header").scrollIntoView();
		cy.get('[data-testid="dashboard-event-list"]').should("contain.text", "This is a private notification");
		cy.get('[data-testid="pinned-events-strip"]').should("be.visible");
		cy.intercept("GET", /\/events(?:\?.*)?$/, {
			statusCode: 200,
			delay: 5000,
			headers: { "Per-Page": "1", Total: "1" },
			body: {
				...DASHBOARD_EVENTS_RESPONSE,
				data: DASHBOARD_EVENTS_RESPONSE.data.map((event) => ({ ...event, attributes: { ...event.attributes, content: "Personal response" } })),
			},
		}).as("slowFilter");
		cy.document().then((doc) => {
			const style = doc.createElement("style");
			style.textContent = '[data-testid="event-feed-filter-loading"] { animation: none !important; }';
			doc.head.appendChild(style);
		});
		cy.get("@header").contains("button", "С моим участием").click().should("have.attr", "aria-pressed", "true");
		cy.get('[data-testid="event-feed-filter-loading"]').should("be.visible");
		cy.get('[data-testid="dashboard-event-list"] [inert]').should("have.css", "opacity", "0.45").and("contain.text", "This is a private notification");
		cy.get("@header").find('[data-testid="event-feed-give-button"]').should("be.enabled");
		cy.get('[data-testid="event-feed-filter-loading"]').then(($loader) => {
			let scrollContainer = $loader[0].parentElement;
			while (scrollContainer && !(scrollContainer.scrollHeight > scrollContainer.clientHeight && /auto|scroll/.test(getComputedStyle(scrollContainer).overflowY))) {
				scrollContainer = scrollContainer.parentElement;
			}
			expect(scrollContainer, "feed scroll container").not.to.be.null;
			scrollContainer.scrollTop += 400;
		});
		cy.get('[data-testid="event-feed-filter-loading"]').should(($loader) => {
			const rect = $loader[0].getBoundingClientRect();
			expect(rect.top).to.be.at.least(0);
			expect(rect.bottom).to.be.at.most($loader[0].ownerDocument.defaultView.innerHeight);
		});
		cy.get("@header").contains("button", "Все записи").click().should("have.attr", "aria-pressed", "true");
		cy.get('[data-testid="event-feed-filter-loading"]').should("not.exist");
		cy.wait("@slowFilter");
		cy.get('[data-testid="dashboard-event-list"]').should("not.contain.text", "Personal response");
		cy.get('[data-testid="event-feed-filter-loading"]').should("not.exist");
	});
});
