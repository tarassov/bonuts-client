import { GetCirclesApiResponse, GetCirclesByIdApiResponse } from "services/api/bonuts-api";

import { TCircle } from "@/types/model/circle";

export const apiCirclesAdaptor = (response: GetCirclesApiResponse): Array<TCircle> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		const { attributes, id } = target;
		return {
			...attributes,
			id: Number(id),
		};
	});
};
export const apiCircleAdaptor = (response?: GetCirclesByIdApiResponse): TCircle | undefined => {
	if (!response) return undefined;
	const { data } = response;

	if (!data) return undefined;

	const { attributes, id } = data;
	return {
		...attributes,
		id: Number(id),
	};
};
