import { bonutsApiOverride } from "services/api/injected-api";

export const vkApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["VK", "Notifications"],
	endpoints: {
		postVkConnect: { invalidatesTags: ["VK", "Notifications"] },
		deleteVkDisconnect: { invalidatesTags: ["VK", "Notifications"] },
		getVkMe: { providesTags: ["VK"] },
	},
});
export const { useGetVkMeQuery, usePostVkConnectMutation, useDeleteVkDisconnectMutation } = vkApi;
