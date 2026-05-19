import type { TRequestSort } from "./request-feed";
import type { TRequest } from "@/types/model/request";

const getTimeValue = (value?: string | null) => {
	if (!value) return 0;

	const parsed = new Date(value).getTime();

	return Number.isNaN(parsed) ? 0 : parsed;
};

export const sortRequests = (requests: Array<TRequest>, sort: TRequestSort) => {
	return [...requests].sort((firstRequest, secondRequest) => {
		const firstTime = getTimeValue(firstRequest.created_at);
		const secondTime = getTimeValue(secondRequest.created_at);

		return sort === "oldest" ? firstTime - secondTime : secondTime - firstTime;
	});
};

export const getRequestDisplayName = (request: TRequest) => {
	return request.profile?.name || request.profile?.user_name || request.name || request.profile?.email || "";
};

export const getRequestPosition = (request: TRequest) => {
	return request.profile?.position || null;
};

export const getRequestEmail = (request: TRequest) => {
	return request.profile?.email || null;
};

export const getRequestDonutName = (request: TRequest) => {
	return request.donut?.name || request.donut_name || null;
};

export const getRequestInitials = (request: TRequest) => {
	const displayName = getRequestDisplayName(request).trim();

	if (!displayName) return "B";

	const initials = displayName
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part.charAt(0))
		.join("");

	return initials.toUpperCase() || "B";
};
