import { useState } from "react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";

import { describe, expect, it, vi } from "vitest";

import { useHistoryBack } from "./use-history-back";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

function LocationProbe() {
	const location = useLocation();

	return (
		<>
			<span data-testid="location-key">{location.key}</span>
			<span data-testid="location-url">{`${location.pathname}${location.search}${location.hash}`}</span>
		</>
	);
}

function HistoryBackHarness({ callback }: { callback: VoidFunction }) {
	const navigate = useNavigate();

	useHistoryBack({
		callback,
		enabled: true,
		key: "modal-1",
	});

	return (
		<button type="button" onClick={() => navigate(-1)}>
			Back
		</button>
	);
}

describe("useHistoryBack", () => {
	it("closes on POP without changing the visible URL", async () => {
		const callback = vi.fn();

		render(
			<MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }} initialEntries={[{ hash: "#post", key: "origin", pathname: "/events", search: "?page=2" }]}>
				<LocationProbe />
				<HistoryBackHarness callback={callback} />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByTestId("location-key").textContent).not.toBe("origin");
		});

		fireEvent.click(screen.getByRole("button", { name: "Back" }));

		await waitFor(() => {
			expect(callback).toHaveBeenCalledTimes(1);
		});
		expect(screen.getByTestId("location-url").textContent).toBe("/events?page=2#post");
	});

	it("removes its marker when unmounted by a regular close", async () => {
		const callback = vi.fn();

		function ModalHarness() {
			const [isOpen, setIsOpen] = useState(true);

			return (
				<>
					{isOpen ? <HistoryBackHarness callback={callback} /> : null}
					<button type="button" onClick={() => setIsOpen(false)}>
						Close
					</button>
				</>
			);
		}

		render(
			<MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }} initialEntries={[{ key: "origin", pathname: "/events" }]}>
				<LocationProbe />
				<ModalHarness />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByTestId("location-key").textContent).not.toBe("origin");
		});

		fireEvent.click(screen.getByRole("button", { name: "Close" }));

		await waitFor(() => {
			expect(screen.getByTestId("location-key").textContent).toBe("origin");
		});
		expect(callback).not.toHaveBeenCalled();
	});
});
