/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress viewport helper */

type TViewportConfig = {
	name: string;
	value?: Cypress.ViewportPreset | { width: number; height: number };
};

type TViewportContext = {
	name: string;
	isMobile: boolean;
};

export const TEST_VIEWPORTS = {
	desktop: { name: "desktop" },
	mobile: { name: "mobile", value: "iphone-x" as const },
};

function applyViewport(viewport?: TViewportConfig["value"]) {
	if (!viewport) {
		cy.viewport(1280, 720);
		return;
	}

	if (typeof viewport === "string") {
		cy.viewport(viewport);
		return;
	}

	cy.viewport(viewport.width, viewport.height);
}

export function runInViewports(viewports: TViewportConfig[], runTests: (context: TViewportContext) => void) {
	viewports.forEach((viewport) => {
		describe(`[${viewport.name}]`, () => {
			beforeEach(() => {
				applyViewport(viewport.value);
			});

			runTests({
				name: viewport.name,
				isMobile: viewport.name === TEST_VIEWPORTS.mobile.name,
			});
		});
	});
}
