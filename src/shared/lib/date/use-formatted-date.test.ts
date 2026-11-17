import { expect, it, vi } from "vitest";

import { useFormattedDate } from "./use-formatted-date";
import { renderHook } from "@testing-library/react";

vi.mock("react-i18next", () => ({
	useTranslation: () => ({ i18n: { language: "ru" } }),
}));

it("formats Date values and keeps ISO, local date-only and invalid input behavior", () => {
	const { result } = renderHook(() => useFormattedDate());
	const format = result.current.getFormattedDate;
	const date = new Date(2026, 10, 14, 12);
	const options = { day: "numeric", month: "long" } as const;
	expect(format(date, options)).toBe("14 ноября");
	expect(format(date.toISOString(), options)).toBe(format(date, options));
	expect(format("2026-11-14", options)).toBe("14 ноября");
	expect(format(date)).toContain("2026");
	expect(format("invalid")).toBe("");
	expect(format(new Date(Number.NaN))).toBe("");
	expect(format()).toBe("");
});
