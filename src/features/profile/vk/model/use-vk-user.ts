import { useGetVkMeQuery } from "../api/vk-api";

export function useVkUser() {
	const { data: user, isLoading, refetch } = useGetVkMeQuery();
	return { user, isLoading, refetch };
}
