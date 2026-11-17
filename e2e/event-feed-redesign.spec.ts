import { DASHBOARD_EVENTS_RESPONSE, mockDashboard } from "./support/dashboard-page";
import { expectCompactHeader } from "./support/feed-layout";
import { expect, test, visitAuthorized } from "./support/fixtures";

for (const viewport of [
	{ name: "desktop", width: 1280, height: 720 },
	{ name: "compact desktop", width: 1024, height: 720 },
	{ name: "narrow", width: 320, height: 720 },
])
	test.describe(viewport.name, () => {
		test.use({ viewport });
		for (const theme of ["light", "dark"])
			test(`keeps recognition readable and sidebar stationary in ${theme}`, async ({ page, api }) => {
				await page.clock.setFixedTime(new Date("2026-11-17T12:00:00Z"));
				mockDashboard(api);
				if (viewport.width >= 900) api.mock("GET", "/events/pinned", { body: DASHBOARD_EVENTS_RESPONSE });
				api.mock("GET", "/events", {
					body: {
						data: Array.from({ length: 20 }, (_, index) => ({
							...DASHBOARD_EVENTS_RESPONSE.data[0],
							id: String(200 + index),
							attributes: {
								...DASHBOARD_EVENTS_RESPONSE.data[0].attributes,
								id: 200 + index,
								// Different calendar days in the same period must share one marker.
								date_string_utc: ["2026-11-16T10:00:00Z", "2026-11-14T10:00:00Z", "2026-11-13T10:00:00Z", "2026-10-12T10:00:00Z", "2026-09-15T10:00:00Z", "2025-12-10T10:00:00Z"][
									Math.min(Math.floor(index / 3), 5)
								],
								public: true,
								user_name: "Александра Константинопольская",
								position: "Поддержка команды",
								content: "Спасибо за помощь с запуском проекта! Благодаря тебе команда справилась вовремя.",
								operation: { id: 200 + index, deal_type: "share", amount: 5, direction: 1, to_profile: { id: 2, name: "Константин Александровский", position: "Разработчик" } },
							},
						})),
					},
					headers: { "Per-Page": "20", Total: "20" },
				});
				await visitAuthorized(page, "/", { locale: "ru" }, theme);
				const back = page.getByRole("button", { name: "Наверх", exact: true });
				await expect(back).toHaveCount(0);
				const card = page.getByTestId("event-card-public").first();
				await expect(card).toBeVisible();
				const header = page.getByTestId("event-feed-header");
				await expectCompactHeader(header);
				await expect
					.poll(async () => {
						const headerBounds = await header.boundingBox();
						const cardBounds = await card.boundingBox();
						if (!headerBounds || !cardBounds) return false;

						return Math.abs(headerBounds.x - cardBounds.x) <= 1 && Math.abs(headerBounds.x + headerBounds.width - cardBounds.x - cardBounds.width) <= 1;
					})
					.toBe(true);
				const giveButton = header.getByTestId("event-feed-give-button");
				await expect
					.poll(() =>
						giveButton.evaluate((button) => {
							const panel = button.closest('[data-testid="event-feed-header"]');
							if (!panel) return false;

							const style = getComputedStyle(panel);
							const rightInset = Number.parseFloat(style.paddingRight) + Number.parseFloat(style.borderRightWidth);
							return Math.abs(panel.getBoundingClientRect().right - button.getBoundingClientRect().right - rightInset) <= 1;
						})
					)
					.toBe(true);
				await expect(card.getByTestId("event-recognition-header")).toContainText("+5");
				await expect(card.getByRole("button", { name: /Александра Константинопольская/ })).toBeVisible();
				await expect(card.getByRole("button", { name: /Константин Александровский/ })).toBeVisible();
				expect(await card.evaluate((el) => [el, ...el.querySelectorAll("button")].every((item) => item.scrollWidth <= item.clientWidth + 1))).toBe(true);
				const markers = page.getByTestId("feed-month-marker");
				await expect(markers).toHaveText(["Ноябрь 2026", "Октябрь 2026", "Сентябрь 2026", "Декабрь 2025"]);
				await expect(markers.first()).toHaveAttribute("aria-current", "true");
				await expect(markers.first()).toHaveCSS("height", "24px");
				const navigationName = "Месяц публикации";
				const rail = page.getByRole("navigation", { name: navigationName });
				if (viewport.width >= 900) {
					await card.hover();
					await expect(card).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -2)");
					await expect(card).toHaveCSS("box-shadow", /0px 14px 34px/);
					await rail.hover();
					await expect(card).toHaveCSS("transform", "none");
					await expect(rail).toHaveCSS("width", "28px");
					await expect(rail.getByRole("button")).toHaveCount(4);
					const railBounds = await rail.boundingBox();
					const scrollBounds = await page.getByTestId("dashboard-event-list").locator(".scroll").boundingBox();
					const lastDotBounds = await rail.getByRole("button").last().boundingBox();
					const widgetBounds = await page.getByTestId("dashboard-social-sidebar").boundingBox();
					if (!railBounds || !scrollBounds || !lastDotBounds || !widgetBounds) throw new Error("Feed navigation layout is missing");
					const railBottom = railBounds.y + railBounds.height;
					expect(railBottom).toBeCloseTo(scrollBounds.y + scrollBounds.height, 0);
					expect(railBounds.x - (scrollBounds.x + scrollBounds.width)).toBeCloseTo(4, 0);
					expect(widgetBounds.x - (railBounds.x + railBounds.width)).toBeCloseTo(6, 0);
					expect(lastDotBounds.y + lastDotBounds.height).toBeCloseTo(railBottom, 0);
					await expect(rail).toHaveCSS("background-size", "1px 100%");
					const cardBounds = await card.boundingBox();
					expect(railBounds?.x ?? 0).toBeGreaterThanOrEqual((cardBounds?.x ?? 0) + (cardBounds?.width ?? 0));
					const october = rail.getByRole("button", { name: "Октябрь 2026" });
					await expect(october).toHaveCSS("height", "28px");
					await october.hover();
					expect(await october.evaluate((element) => getComputedStyle(element, "::before").transform)).toBe("matrix(1.5, 0, 0, 1.5, 0, 0)");
					await october.click();
					await expect(october).not.toBeFocused();
					await expect(october).toHaveCSS("outline-style", "none");
					await expect(october).toHaveAttribute("aria-current", "true");
					expect((await rail.boundingBox())?.y).toBe(railBounds?.y);
				} else {
					await expect(rail).toHaveCount(0);
					const picker = page.getByRole("combobox", { name: navigationName });
					await expect(picker.getByRole("option")).toHaveText(["Ноябрь 2026", "Октябрь 2026", "Сентябрь 2026", "Декабрь 2025"]);
					const feedWidth = await page.getByTestId("dashboard-event-list").evaluate((el) => el.clientWidth);
					const cardWidth = await card.evaluate((el) => (el as HTMLElement).offsetWidth);
					expect(Math.abs(feedWidth - cardWidth)).toBeLessThanOrEqual(1);
					await picker.selectOption({ label: "Октябрь 2026" });
					await expect(picker).toHaveValue("2026-10");
					await expect(markers.nth(1)).toHaveAttribute("aria-current", "true");
				}

				await page.getByTestId("event-card-public").last().scrollIntoViewIfNeeded();
				await expect(markers.last()).toHaveAttribute("aria-current", "true");
				await expect(markers.first()).not.toHaveAttribute("aria-current", "true");
				await expect(back).toBeVisible();
				await back.click();
				await expect(back).toHaveCount(0);
				await expect(markers.first()).toHaveAttribute("aria-current", "true");
				if (viewport.width >= 900) {
					const sidebar = page.getByTestId("dashboard-social-sidebar");
					const top = await sidebar.evaluate((el) => el.getBoundingClientRect().top);
					await markers.last().scrollIntoViewIfNeeded();
					await expect.poll(() => sidebar.evaluate((el) => el.getBoundingClientRect().top)).toBe(top);
				}
			});
	});

test("adds month dots as ordinary scrolling loads the next page", async ({ page, api }) => {
	mockDashboard(api);
	const requestedPages: number[] = [];
	const pageSize = 12;
	api.mock("GET", "/events", (request) => {
		const pageNumber = Number(new URL(request.url()).searchParams.get("page"));
		requestedPages.push(pageNumber);
		return {
			body: {
				data: Array.from({ length: pageSize }, (_, index) => {
					const position = (pageNumber - 1) * pageSize + index + 1;
					const source = DASHBOARD_EVENTS_RESPONSE.data[0];
					return {
						...source,
						id: String(position),
						attributes: {
							...source.attributes,
							id: position,
							public: true,
							content: `Feed record ${position}`,
							date_string_utc: position <= 13 ? "2026-11-10T10:00:00Z" : "2026-10-01T10:00:00Z",
						},
					};
				}),
			},
			headers: { "Per-Page": String(pageSize), Total: "24" },
		};
	});

	await visitAuthorized(page, "/", { locale: "ru" });
	const rail = page.getByRole("navigation", { name: "Месяц публикации" });
	const november = rail.getByRole("button", { name: "Ноябрь 2026" });
	const october = rail.getByRole("button", { name: "Октябрь 2026" });
	await expect(november).toBeVisible();
	await expect(october).toHaveCount(0);
	const initialRailBounds = await rail.boundingBox();
	await november.click();
	expect(requestedPages).toEqual([1]);

	const card = (position: number) => page.getByTestId("event-card-public").filter({ has: page.getByText(`Feed record ${position}`, { exact: true }) });
	const firstEntrance = card(1).locator("..");
	await expect(firstEntrance).toHaveCSS("animation-duration", "0.6s");
	await expect(firstEntrance).toHaveCSS("animation-delay", "0.12s");

	const existingCard = card(8);
	const existingEntrance = existingCard.locator("..");
	await expect(existingEntrance).toHaveCSS("animation-name", "none");
	await existingCard.scrollIntoViewIfNeeded();
	await expect(existingEntrance).toHaveCSS("animation-name", "none");
	await expect(existingEntrance).toHaveCSS("transition-property", "opacity");
	await expect(existingEntrance).toHaveCSS("opacity", "1");

	const scroll = page.getByTestId("dashboard-event-list").locator(".scroll");
	await scroll.evaluate((element) => {
		element.scrollTop = element.scrollHeight;
	});
	await expect(october).toBeVisible();
	const newCard = card(13);
	await newCard.scrollIntoViewIfNeeded();
	await expect(newCard.locator("..")).toHaveCSS("animation-name", "none");
	await expect(newCard.locator("..")).toHaveCSS("opacity", "1");
	await expect(existingEntrance).toHaveCSS("opacity", "0.92");
	expect(await rail.boundingBox()).toEqual(initialRailBounds);
	const octoberBounds = await october.boundingBox();
	if (!initialRailBounds || !octoberBounds) throw new Error("Loaded month position is missing");
	expect(octoberBounds.y + octoberBounds.height).toBeCloseTo(initialRailBounds.y + initialRailBounds.height, 0);
	expect(requestedPages).toEqual([1, 2]);
	await expect(page.getByTestId("feed-month-marker")).toHaveText(["Ноябрь 2026", "Октябрь 2026"]);
	await october.press("Enter");
	await expect(october).toBeFocused();
	await expect(october).toHaveAttribute("aria-current", "true");
	await existingCard.scrollIntoViewIfNeeded();
	await expect(existingEntrance).toHaveCSS("opacity", "1");
	expect(requestedPages).toEqual([1, 2]);
});

test("aligns short months near the end of the feed when their timeline dots are clicked", async ({ page, api }) => {
	mockDashboard(api);
	api.mock("GET", "/events/pinned", { body: DASHBOARD_EVENTS_RESPONSE });
	api.mock("GET", "/events", {
		body: {
			data: Array.from({ length: 14 }, (_, index) => {
				const source = DASHBOARD_EVENTS_RESPONSE.data[0];
				const date = index < 12 ? "2026-11-10T10:00:00Z" : index === 12 ? "2026-10-01T10:00:00Z" : "2026-09-01T10:00:00Z";

				return {
					...source,
					id: String(index + 1),
					attributes: { ...source.attributes, id: index + 1, public: true, date_string_utc: date },
				};
			}),
		},
		headers: { "Per-Page": "14", Total: "14" },
	});

	await visitAuthorized(page, "/", { locale: "ru" });
	const rail = page.getByRole("navigation", { name: "Месяц публикации" });
	const pinned = page.getByTestId("pinned-events-strip");
	await expect(pinned).toBeVisible();

	for (const name of ["Сентябрь 2026", "Октябрь 2026", "Ноябрь 2026"]) {
		const dot = rail.getByRole("button", { name });
		const marker = page.getByTestId("feed-month-marker").filter({ hasText: name });
		await dot.click();
		await expect(dot).toHaveAttribute("aria-current", "true");
		await expect
			.poll(async () => {
				const markerBounds = await marker.boundingBox();
				const pinnedBounds = await pinned.boundingBox();
				return markerBounds && pinnedBounds ? Math.abs(markerBounds.y - pinnedBounds.y - pinnedBounds.height) : Infinity;
			})
			.toBeLessThanOrEqual(2);
	}
});
