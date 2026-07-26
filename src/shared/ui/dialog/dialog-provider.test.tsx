import { StrictMode, useContext, useRef } from "react";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { useModalGeneric } from "@/shared/lib/modal";

import { defineModal } from "./define-modal";
import { DialogControlsContext, DialogNamesContext, DialogValueContext } from "./dialog-context";
import { BntDialogProvider } from "./dialog-provider";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

type TEntry = { hash: string; pathname: string; search: string; state: Record<string, unknown> };

// A minimal history stack, so Back can be exercised the same way a browser does it.
const { historyMock } = vi.hoisted(() => {
	const createEntry = (pathname: string, state: Record<string, unknown> = {}): TEntry => ({ hash: "", pathname, search: "", state });
	const stack = { entries: [createEntry("/feed")], index: 0 };
	const listeners = new Set<() => void>();

	const notify = () => listeners.forEach((listener) => listener());

	return {
		historyMock: {
			get entriesCount() {
				return stack.entries.length;
			},
			get index() {
				return stack.index;
			},
			get location() {
				return stack.entries[stack.index];
			},
			back: () => {
				stack.index = Math.max(0, stack.index - 1);
				notify();
			},
			go: (delta: number) => {
				stack.index = Math.min(Math.max(0, stack.index + delta), stack.entries.length - 1);
				notify();
			},
			push: (to: string | Partial<TEntry>, state?: Record<string, unknown>) => {
				const current = stack.entries[stack.index];
				const pathname = typeof to === "string" ? to : (to.pathname ?? current.pathname);

				stack.entries = [...stack.entries.slice(0, stack.index + 1), createEntry(pathname, state ?? {})];
				stack.index = stack.entries.length - 1;
				notify();
			},
			replace: (to: string | Partial<TEntry>, state?: Record<string, unknown>) => {
				const current = stack.entries[stack.index];
				const pathname = typeof to === "string" ? to : (to.pathname ?? current.pathname);

				stack.entries = stack.entries.map((entry, entryIndex) => (entryIndex === stack.index ? createEntry(pathname, state ?? {}) : entry));
				notify();
			},
			reset: (pathname: string) => {
				stack.entries = [createEntry(pathname)];
				stack.index = 0;
			},
			// Rebuilds the session the way a page reload leaves it: the entries and their state survive.
			restore: (entries: Array<{ pathname: string; state?: Record<string, unknown> }>) => {
				stack.entries = entries.map((entry) => createEntry(entry.pathname, entry.state));
				stack.index = stack.entries.length - 1;
			},
			subscribe: (listener: () => void) => {
				listeners.add(listener);

				return () => {
					listeners.delete(listener);
				};
			},
		},
	};
});

vi.mock("@/shared/lib/navigation", async () => {
	const { useEffect, useReducer } = await import("react");

	return {
		useAppNavigate: () => {
			const [, forceUpdate] = useReducer((value: number) => value + 1, 0);

			useEffect(() => historyMock.subscribe(forceUpdate), []);

			return {
				go: historyMock.go,
				goBack: () => historyMock.go(-1),
				location: historyMock.location,
				navigate: historyMock.push,
				replace: historyMock.replace,
			};
		},
	};
});

// The container renders MUI dialogs, which says nothing about the provider's state and history handling.
vi.mock("./dialog-container", () => ({ BntDialogContainer: () => null }));

const config = {
	items: {
		Alpha: defineModal<{ title?: string }, string>({ renderItem: () => null, closeOnBack: true }),
		Detailed: defineModal<{ id: number }>({ renderItem: () => null, getPath: (data) => `event/${data.id}` }),
		Plain: defineModal({ renderItem: () => null }),
	},
};

type TTestItems = typeof config.items;

function OpenedModalsProbe() {
	const modals = useContext(DialogValueContext);

	return (
		<>
			<span data-testid="opened">
				{modals
					.filter((modal) => !modal.isClosing)
					.map((modal) => modal.name)
					.join(",")}
			</span>
			{/* Closed modals stay in the list while their exit transition plays. */}
			<span data-testid="rendered">{modals.map((modal) => modal.name).join(",")}</span>
		</>
	);
}

function ModalActions({ onResult }: { onResult: (result: unknown) => void }) {
	const modalNames = useContext(DialogNamesContext);
	const modals = useContext(DialogValueContext);
	const { removeModal } = useContext(DialogControlsContext);
	const { Alpha, Detailed, Plain, closeAll } = useModalGeneric<TTestItems>(modalNames);

	// The container is mocked here, so the end of the exit transition is triggered by hand.
	const finishTransitions = () => modals.filter((modal) => modal.isClosing).forEach((modal) => removeModal(modal.modalKey));

	return (
		<>
			<button type="button" onClick={() => Alpha.show({}).then(onResult)}>
				open alpha
			</button>
			<button type="button" onClick={() => Detailed.show({ id: 7 }).then(onResult)}>
				open detailed
			</button>
			<button type="button" onClick={() => Plain.show().then(onResult)}>
				open plain
			</button>
			<button type="button" onClick={() => Alpha.hide("alpha-result")}>
				hide alpha
			</button>
			<button type="button" onClick={() => closeAll()}>
				close all
			</button>
			<button type="button" onClick={finishTransitions}>
				finish transitions
			</button>
		</>
	);
}

// The handlers must not be rebuilt on every navigation, otherwise every useModal consumer re-renders with them.
function HandlerIdentityProbe() {
	const modalNames = useContext(DialogNamesContext);
	const { Alpha } = useModalGeneric<TTestItems>(modalNames);
	const firstHandlerRef = useRef(Alpha);

	return <span data-testid="handler-stable">{String(firstHandlerRef.current === Alpha)}</span>;
}

type TRenderOptions = {
	isRestoreEnabled?: boolean;
	onResult?: (result: unknown) => void;
	strictMode?: boolean;
};

function renderProvider({ isRestoreEnabled = true, onResult = vi.fn(), strictMode = false }: TRenderOptions = {}) {
	const buildTree = (canRestore: boolean) => {
		const tree = (
			<BntDialogProvider config={config} isRestoreEnabled={canRestore}>
				<OpenedModalsProbe />
				<HandlerIdentityProbe />
				<ModalActions onResult={onResult} />
			</BntDialogProvider>
		);

		return strictMode ? <StrictMode>{tree}</StrictMode> : tree;
	};

	const { rerender } = render(buildTree(isRestoreEnabled));

	return { enableRestore: () => rerender(buildTree(true)) };
}

const openedModals = () => screen.getByTestId("opened").textContent;
const renderedModals = () => screen.getByTestId("rendered").textContent;
const areHandlersStable = () => screen.getByTestId("handler-stable").textContent;
const clickButton = (name: string) => fireEvent.click(screen.getByRole("button", { name }));
const pressBrowserBack = () => act(() => historyMock.back());

describe("BntDialogProvider", () => {
	beforeEach(() => {
		historyMock.reset("/feed");
	});

	it("hides every opened instance of a modal by its name and pops the entries it owns", async () => {
		const onResult = vi.fn();
		renderProvider({ onResult });

		clickButton("open alpha");
		clickButton("open alpha");

		await waitFor(() => expect(openedModals()).toBe("Alpha,Alpha"));
		expect(historyMock.index).toBe(2);

		clickButton("hide alpha");

		await waitFor(() => expect(openedModals()).toBe(""));
		expect(historyMock.index).toBe(0);
		expect(onResult).toHaveBeenCalledTimes(2);
		expect(onResult).toHaveBeenCalledWith("alpha-result");
	});

	it("keeps the modal handlers stable while the location changes", async () => {
		renderProvider();

		clickButton("open detailed");

		await waitFor(() => expect(openedModals()).toBe("Detailed"));
		expect(areHandlersStable()).toBe("true");

		act(() => historyMock.push("/other"));

		await waitFor(() => expect(openedModals()).toBe(""));
		expect(areHandlersStable()).toBe("true");
	});

	it("keeps a closed modal rendered until its exit transition has finished", async () => {
		renderProvider();

		clickButton("open alpha");

		await waitFor(() => expect(openedModals()).toBe("Alpha"));

		clickButton("hide alpha");

		await waitFor(() => expect(openedModals()).toBe(""));
		// Closed for the application, still on screen for the animation.
		expect(renderedModals()).toBe("Alpha");
		expect(historyMock.index).toBe(0);

		clickButton("finish transitions");

		await waitFor(() => expect(renderedModals()).toBe(""));
	});

	it("closes the whole stack in a single history traverse", async () => {
		renderProvider();

		clickButton("open alpha");
		clickButton("open detailed");

		await waitFor(() => expect(openedModals()).toBe("Alpha,Detailed"));
		expect(historyMock.location.pathname).toBe("/event/7");

		clickButton("close all");

		await waitFor(() => expect(openedModals()).toBe(""));
		expect(historyMock.index).toBe(0);
		expect(historyMock.location.pathname).toBe("/feed");
	});

	it("closes modals one by one on Back, topmost first", async () => {
		const onResult = vi.fn();
		renderProvider({ onResult });

		clickButton("open alpha");
		clickButton("open detailed");

		await waitFor(() => expect(openedModals()).toBe("Alpha,Detailed"));

		pressBrowserBack();

		await waitFor(() => expect(openedModals()).toBe("Alpha"));
		expect(historyMock.location.pathname).toBe("/feed");
		expect(onResult).toHaveBeenCalledTimes(1);

		pressBrowserBack();

		await waitFor(() => expect(openedModals()).toBe(""));
		expect(historyMock.index).toBe(0);
		expect(onResult).toHaveBeenCalledTimes(2);
	});

	it("keeps the modal underneath open when Forward returns to a closed nested entry", async () => {
		renderProvider();

		clickButton("open detailed");
		clickButton("open alpha");

		await waitFor(() => expect(openedModals()).toBe("Detailed,Alpha"));

		clickButton("hide alpha");

		await waitFor(() => expect(openedModals()).toBe("Detailed"));

		clickButton("finish transitions");

		await waitFor(() => expect(renderedModals()).toBe("Detailed"));

		act(() => historyMock.go(1));

		// The entry belongs to a modal that no longer exists, it must not take the one below with it.
		await waitFor(() => expect(historyMock.index).toBe(2));
		expect(openedModals()).toBe("Detailed");
		expect(renderedModals()).toBe("Detailed");
	});

	it("reopens a modal with its own address when Forward returns to its entry", async () => {
		renderProvider();

		clickButton("open detailed");

		await waitFor(() => expect(openedModals()).toBe("Detailed"));

		pressBrowserBack();

		await waitFor(() => expect(openedModals()).toBe(""));

		act(() => historyMock.go(1));

		await waitFor(() => expect(openedModals()).toBe("Detailed"));
		expect(historyMock.location.pathname).toBe("/event/7");
		expect(historyMock.entriesCount).toBe(2);
	});

	// A page reload restores the modal from the history state it was opened with.
	const declaration = { background: { pathname: "/feed" }, data: { id: 7 }, modal: true, modalKey: "modal-/feed-1", name: "Detailed" };

	const restoreReloadedModal = () => {
		historyMock.restore([{ pathname: "/feed" }, { pathname: "/event/7", state: { ...declaration, modalIndex: 1 } }]);
	};

	// The same reload, but with a nested modal on top: its entry inherited the declaration of the one below.
	const restoreReloadedNestedModal = () => {
		historyMock.restore([{ pathname: "/feed" }, { pathname: "/event/7", state: { ...declaration, modalIndex: 1 } }, { pathname: "/event/7", state: { ...declaration, modalIndex: 2 } }]);
	};

	it("waits for the application to be ready before opening the modal an entry declares", async () => {
		restoreReloadedModal();
		const { enableRestore } = renderProvider({ isRestoreEnabled: false });

		await waitFor(() => expect(openedModals()).toBe(""));

		enableRestore();

		await waitFor(() => expect(openedModals()).toBe("Detailed"));
	});

	it("leaves the whole restored chain when a modal reopened from a nested reload is closed", async () => {
		restoreReloadedNestedModal();
		renderProvider();

		await waitFor(() => expect(openedModals()).toBe("Detailed"));
		expect(historyMock.index).toBe(2);

		clickButton("close all");

		await waitFor(() => expect(historyMock.index).toBe(0));
		expect(historyMock.location.pathname).toBe("/feed");
		// The entry below declared the same modal, closing must not bring it back.
		await waitFor(() => expect(openedModals()).toBe(""));
	});

	it("takes over the restored entry after a reload instead of duplicating it", async () => {
		restoreReloadedModal();
		renderProvider();

		await waitFor(() => expect(openedModals()).toBe("Detailed"));
		expect(historyMock.entriesCount).toBe(2);
		expect(historyMock.index).toBe(1);
		expect(historyMock.location.pathname).toBe("/event/7");
		// The page behind the modal still has to be known after the takeover.
		expect(historyMock.location.state.background).toEqual({ pathname: "/feed" });

		clickButton("close all");

		await waitFor(() => expect(openedModals()).toBe(""));
		expect(historyMock.index).toBe(0);
		expect(historyMock.location.pathname).toBe("/feed");
	});

	it("claims a single entry for a reloaded modal when strict mode runs the effects twice", async () => {
		restoreReloadedModal();
		renderProvider({ strictMode: true });

		await waitFor(() => expect(openedModals()).toBe("Detailed"));
		expect(historyMock.entriesCount).toBe(2);

		clickButton("close all");

		await waitFor(() => expect(openedModals()).toBe(""));
		// A doubled claim would traverse the history twice and overshoot the page behind the modal.
		expect(historyMock.index).toBe(0);
		expect(historyMock.location.pathname).toBe("/feed");
	});

	it("closes a reloaded modal on Back and lands on the page behind it", async () => {
		restoreReloadedModal();
		renderProvider();

		await waitFor(() => expect(openedModals()).toBe("Detailed"));

		pressBrowserBack();

		await waitFor(() => expect(openedModals()).toBe(""));
		expect(historyMock.index).toBe(0);
		expect(historyMock.location.pathname).toBe("/feed");
	});

	it("keeps modals that stay out of history untouched by Back and closes them when the page changes", async () => {
		renderProvider();

		clickButton("open alpha");
		clickButton("open plain");

		await waitFor(() => expect(openedModals()).toBe("Alpha,Plain"));
		// Only Alpha owns an entry: Plain opts out of history handling.
		expect(historyMock.index).toBe(1);

		pressBrowserBack();

		await waitFor(() => expect(openedModals()).toBe("Plain"));

		act(() => historyMock.push("/other"));

		await waitFor(() => expect(openedModals()).toBe(""));
	});
});
