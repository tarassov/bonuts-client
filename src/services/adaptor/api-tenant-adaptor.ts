import { GetTenantCurrentApiResponse } from "services/api/bonuts-api";
import { TTenant } from "@/types/model/tenant";

export const apiTenantAdaptor = (response?: GetTenantCurrentApiResponse): TTenant | undefined => {
	if (!response) return undefined;
	const { data } = response;

	if (!data) return undefined;

	const { attributes, id } = data;

	return {
		...attributes,
		caption: attributes.caption || undefined,
		id: Number(id),
	};
};
