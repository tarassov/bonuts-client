import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useBecome } from "./use-become";
import { act, renderHook } from "@testing-library/react";

const mocks = vi.hoisted(() => ({
	profile: { system_admin: false, user_id: 1 },
	unwrap: vi.fn(),
	postBecome: vi.fn(),
	persist: vi.fn(),
	showError: vi.fn(),
}));

vi.mock("@/shared/model/auth", () => ({ useAuthTenant: () => "team", persistAuthSession: mocks.persist }));
vi.mock("@/shared/ui/notification", () => ({ useNotification: () => ({ showResponseError: mocks.showError }) }));
vi.mock("@/services/api/bonuts-api", () => ({
	useGetProfileQuery: () => ({ data: { data: { attributes: mocks.profile } } }),
	usePostBecomeMutation: () => [mocks.postBecome, { isLoading: false }],
}));

describe("useBecome", () => {
	afterEach(() => vi.unstubAllGlobals());
	beforeEach(() => {
		vi.clearAllMocks();
		mocks.profile = { system_admin: false, user_id: 1 };
		mocks.postBecome.mockReturnValue({ unwrap: mocks.unwrap });
	});

	it("prevents non-system administrators from switching users", async () => {
		const { result } = renderHook(() => useBecome(2));
		expect(result.current.canBecome).toBe(false);
		await act(() => result.current.become());
		expect(mocks.postBecome).not.toHaveBeenCalled();
	});

	it("requires another user's id even for system administrators", () => {
		mocks.profile.system_admin = true;
		expect(renderHook(() => useBecome(1)).result.current.canBecome).toBe(false);
		expect(renderHook(() => useBecome()).result.current.canBecome).toBe(false);
		expect(renderHook(() => useBecome(2)).result.current.canBecome).toBe(true);
	});

	it("persists the target session before opening the home page", async () => {
		mocks.profile.system_admin = true;
		const payload = { auth_token: "target-token", currentTenant: "team", tenants: [] };
		mocks.unwrap.mockResolvedValue(payload);
		const assign = vi.fn();
		vi.stubGlobal("window", { location: { assign } });
		const { result } = renderHook(() => useBecome(2));
		await act(() => result.current.become());
		expect(mocks.persist).toHaveBeenCalledWith(payload);
		expect(assign).toHaveBeenCalledWith("/");
	});

	it("sends the user id and preserves the session on failure", async () => {
		mocks.profile.system_admin = true;
		const error = { status: 403 };
		mocks.unwrap.mockRejectedValue(error);
		const { result } = renderHook(() => useBecome(2));
		await act(() => result.current.become());
		expect(mocks.postBecome).toHaveBeenCalledWith({ body: { user_id: 2 } });
		expect(mocks.showError).toHaveBeenCalledWith(error);
		expect(mocks.persist).not.toHaveBeenCalled();
	});
});
