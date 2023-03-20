import { apiEventsToPosts } from "./api-events-to-posts";

export const apiTranslator = (() => {
	return {
		toPosts: apiEventsToPosts,
	};
})();
