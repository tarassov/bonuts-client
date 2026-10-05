import type { GetDonutsApiResponse, GetDonutsByIdApiResponse } from "../api/bonuts-api";

import type { TDonut } from "@/types/model";

type TApiDonut = GetDonutsApiResponse["data"][number];

const hasValidName = (donut: TApiDonut) => typeof donut.name === "string" && Boolean(donut.name.trim());

const normalizeDescription = (description: unknown) => {
	if (typeof description !== "string") return undefined;

	const normalizedDescription = description.trim();

	return normalizedDescription && normalizedDescription.toLocaleLowerCase() !== "null" ? normalizedDescription : undefined;
};

const mapDonut = (donut: TApiDonut): TDonut => {
	return {
		...donut,
		id: Number(donut.id),
		name: donut.name.trim(),
		description: normalizeDescription(donut.description),
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

	return data.filter(hasValidName).map(mapDonut);
};

export const apiDonutToDonut = (response: GetDonutsByIdApiResponse | null | undefined): TDonut | null => {
	if (!response?.data || !hasValidName(response.data)) return null;

	return mapDonut(response.data);
};
