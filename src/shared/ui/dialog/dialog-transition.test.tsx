import { useContext } from "react";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { useModalGeneric } from "@/shared/lib/modal";

import { defineModal } from "./define-modal";
import { DialogNamesContext } from "./dialog-context";
import { BntDialogProvider } from "./dialog-provider";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";

const { locationRef } = vi.hoisted(() => ({
	locationRef: { current: { hash: "", pathname: "/feed", search: "", state: {} as Record<string, unknown> } },
}));

vi.mock("@/shared/lib/navigation", () => ({
	useAppNavigate: () => ({
		go: vi.fn(),
		goBack: vi.fn(),
		location: locationRef.current,
		navigate: vi.fn(),
		replace: vi.fn(),
	}),
}));

// The dialog renders localized labels, which say nothing about the transition.
vi.mock("hooks/use-bnt-translate", () => ({
	useBntTranslate: () => ({ t: (value?: string) => value ?? "", translate: (value?: string) => value ?? "" }),
}));

const config = {
	items: {
		Alpha: defineModal({ renderItem: () => <span>alpha body</span>, hasTopMenu: true, title: "Alpha" }),
	},
};

function ModalActions() {
	const modalNames = useContext(DialogNamesContext);
	const { Alpha } = useModalGeneric<typeof config.items>(modalNames);

	return (
		<>
			<button type="button" onClick={() => Alpha.show()}>
				open alpha
			</button>
			<button type="button" onClick={() => Alpha.hide()}>
				hide alpha
			</button>
		</>
	);
}

describe("dialog transition", () => {
	beforeEach(() => {
		locationRef.current = { hash: "", pathname: "/feed", search: "", state: {} };
	});

	it("keeps the dialog in the dom until its exit transition has finished", async () => {
		render(
			<BntDialogProvider config={config}>
				<ModalActions />
			</BntDialogProvider>
		);

		fireEvent.click(screen.getByRole("button", { name: "open alpha" }));

		expect(await screen.findByText("alpha body")).toBeDefined();

		// The opened dialog hides the rest of the app from assistive tech, so the trigger is queried as hidden.
		fireEvent.click(screen.getByRole("button", { hidden: true, name: "hide alpha" }));

		// The record is already closed for the application, but the dialog is still animating out.
		expect(screen.queryByText("alpha body")).not.toBeNull();

		await waitForElementToBeRemoved(() => screen.queryByText("alpha body"));
	});
});
