import { describe, expect, it } from "vitest";

import { EventImages } from "./event-images";
import { render, screen } from "@testing-library/react";

describe("EventImages", () => {
	it("renders event images linked to their originals", () => {
		render(
			<EventImages
				imageLabel="Photos"
				images={[
					{ url: "https://example.com/original-1.png", thumb: { url: "https://example.com/thumb-1.png" } },
					{ url: "https://example.com/original-2.png", thumb: { url: "https://example.com/thumb-2.png" } },
				]}
			/>
		);

		const firstImage = screen.getByRole("img", { name: "Photos 1" }) as HTMLImageElement;
		const firstLink = firstImage.closest("a");

		expect(firstImage.src).toBe("https://example.com/original-1.png");
		expect(firstLink?.href).toBe("https://example.com/original-1.png");
		expect(screen.getAllByRole("img")).toHaveLength(2);
	});

	it("ignores images without a full-size url", () => {
		render(<EventImages imageLabel="Photos" images={[{ thumb: { url: "https://example.com/thumb.png" } }, { thumb: null }]} />);

		expect(screen.queryByRole("img")).toBeNull();
	});
});
