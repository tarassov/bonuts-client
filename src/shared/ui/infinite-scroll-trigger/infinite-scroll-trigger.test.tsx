import { describe, expect, it, vi } from "vitest";

import { InfiniteScrollTrigger } from "./infinite-scroll-trigger";
import { render, waitFor } from "@testing-library/react";

vi.mock("react-intersection-observer", () => ({
	useInView: () => ({ inView: true, ref: vi.fn() }),
}));

describe("InfiniteScrollTrigger", () => {
	it("loads the next page again when fetching finishes while the trigger remains visible", async () => {
		const onLoadMore = vi.fn();
		const { rerender } = render(<InfiniteScrollTrigger isFetching loadedPageCount={1} onLoadMore={onLoadMore} />);

		expect(onLoadMore).not.toHaveBeenCalled();

		rerender(<InfiniteScrollTrigger isFetching={false} loadedPageCount={2} onLoadMore={onLoadMore} />);

		await waitFor(() => expect(onLoadMore).toHaveBeenCalledTimes(1));
	});
});
