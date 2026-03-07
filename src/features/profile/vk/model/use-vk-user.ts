import { useGetVkMeQuery } from "../api/vk-api";

export function useVkUser() {
	const { data: user, isLoading } = useGetVkMeQuery();
	return { user, isLoading };
}
