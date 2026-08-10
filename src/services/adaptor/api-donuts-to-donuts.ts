import type { GetDonutsApiResponse, GetDonutsByIdApiResponse } from "../api/bonuts-api";

import type { TDonut } from "@/types/model";

const mapDonut = (donut: GetDonutsApiResponse["data"][number]): TDonut => {
	return {
		...donut,
		id: Number(donut.id),
		expiration_date: donut.expiration_date ?? null,
		comments: donut.comments || [],
		liked: donut.liked ?? false,
		likes: donut.likes || [],
		commentable: true,
		likeable: true,
	};
};

export const apiDonutsToDonuts = (response: GetDonutsApiResponse): Array<TDonut> => {
	const { data } = response;

	if (!data) return [];

	return data.map(mapDonut);
};

export const apiDonutToDonut = (response: GetDonutsByIdApiResponse | null | undefined): TDonut | null => {
	if (!response || !response.data) return null;
	return mapDonut(response.data);
};
