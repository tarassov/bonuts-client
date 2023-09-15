import { GetAccountOperationsApiResponse } from "services/api/bonuts-api";
import { TOperation } from "@/types/model/operation";

export const apiOperationAdaptor = (
	response: GetAccountOperationsApiResponse
): Array<TOperation> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		const { attributes, id } = target;
		return {
			...attributes,
			created_at_utc: attributes?.created_at_utc || attributes.created_at,
			id: Number(id),
		};
	});
};
