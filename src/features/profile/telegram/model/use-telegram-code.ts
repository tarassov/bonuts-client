import { useAuthTenant } from "shared/model/auth";

import { profilesApi } from "@/entities/profile";

export function useTelegramCode() {
	const tenant = useAuthTenant();
	const [generate, { isLoading }] = profilesApi.usePostUsersGenerateTgMutation();

	const generateTgCode = () => generate({ tenant });

	return { generateTgCode, isLoading };
}
