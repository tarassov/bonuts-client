import { describe, expect, it } from "vitest";

import { getWelcomeUserIdentity } from "./user-invitations-page-helper";
import type { TInvitation } from "@/types/model/inivtation";

const INVITATION: TInvitation = {
	id: 1,
	name: "legacy-team",
	caption: "Legacy Team",
	activated: false,
	closed: false,
	declined: null,
	recipientEmail: "invited@example.com",
	recipientName: "Invited User",
};

describe("getWelcomeUserIdentity", () => {
	it("uses the authenticated user instead of invitation recipient data", () => {
		const identity = getWelcomeUserIdentity(
			{
				email: "alex@bonuts.ru",
				firstName: "Alex",
				lastName: "Tarasov",
			},
			[INVITATION]
		);

		expect(identity).toEqual({
			email: "alex@bonuts.ru",
			initials: "AT",
			name: "Alex Tarasov",
		});
	});

	it("keeps real user data when there are no invitations", () => {
		const identity = getWelcomeUserIdentity(
			{
				email: "alex@bonuts.ru",
				name: "Alex Tarasov",
			},
			[]
		);

		expect(identity.email).toBe("alex@bonuts.ru");
		expect(identity.name).toBe("Alex Tarasov");
		expect(identity.initials).toBe("AT");
	});

	it("falls back to invitation data while current user data is unavailable", () => {
		expect(getWelcomeUserIdentity(undefined, [INVITATION])).toEqual({
			email: "invited@example.com",
			initials: "IU",
			name: "Invited User",
		});
	});
});
