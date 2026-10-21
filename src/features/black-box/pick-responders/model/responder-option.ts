import type { TBlackBoxProfile } from "@/entities/black-box";

import type { TProfile } from "@/types/model";

/** Employees from the directory and saved responders meet in one list, so both become the responder shape. */
export const toResponderOption = (profile: TProfile): TBlackBoxProfile => ({
	id: profile.id,
	full_name: profile.name || [profile.first_name, profile.last_name].filter(Boolean).join(" "),
	position: profile.position ?? null,
	avatar: profile.user_avatar?.thumb?.url ?? profile.user_avatar?.url ?? null,
});
