import { GetDonutsApiResponse } from "../api/bonuts-api";
import { apiEventsToPosts } from "./api-events-to-posts";

export const apiTranslator = (() => {
	return {
		// toEvent: (): TEvent => {
		// 	return {
		// 		content: target["content"],
		// 		date_string: target["date_string"],
		// 		extra_content: target["extra_content"],
		// 		id: target["id"],
		// 		public: target["public"],
		// 	};
		// },
		toDonuts: <T extends GetDonutsApiResponse>(response: T): Array<any> => {
			return [];
		},
		toPosts: apiEventsToPosts,
		// toProfile: (): TProfile => {
		// 	return {
		// 		admin: target["admin"] || false,
		// 		first_name: target["first_name"],
		// 		last_name: target["last_name"],
		// 		position: target["position"],
		// 	};
		// },
	};
})();
