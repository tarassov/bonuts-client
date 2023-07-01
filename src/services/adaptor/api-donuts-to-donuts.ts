import { GetDonutsApiResponse, GetDonutsByIdApiResponse } from "../api/bonuts-api";
import { TDonut } from "@/types/model";

export const apiDonutsToDonuts = (response: GetDonutsApiResponse): Array<TDonut> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		const { attributes, id } = target;
		return {
			...attributes,
			id: Number(id),
			commentable: true,
			likeable: true,
		};
	});
};

export const apiDonutToDonut = (
	response: GetDonutsByIdApiResponse | null | undefined
): TDonut | null => {
	if (!response || !response.data) return null;
	const { attributes, id } = response.data;
	return {
		...attributes,
		logo: attributes.logo,
		id: Number(id),
		commentable: true,
		likeable: true,
	};
};
