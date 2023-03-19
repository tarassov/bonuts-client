import { GetDonutsApiResponse } from "../api/bonuts-api";
import { TDonut } from "../../types/model/donut";

export const apiDonutsToDonuts = (
	response: GetDonutsApiResponse
): Array<TDonut> => {
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
