import { GetTenantCurrentApiResponse, GetTenantsApiResponse } from "services/api/bonuts-api";
import { TTenant } from "@/types/model/tenant";

const dataToTenant = (data: Required<GetTenantCurrentApiResponse>["data"]) => {
	const { attributes, id } = data;

	return {
		...attributes,
		caption: attributes.caption || undefined,
		id: Number(id),
	};
};
export const apiTenantAdaptor = (response?: GetTenantCurrentApiResponse): TTenant | undefined => {
	if (!response) return undefined;

	const { data } = response;

	if (!data) return undefined;

	return dataToTenant(data);
};

export const apiTenantsAdaptor = (response?: GetTenantsApiResponse): Array<TTenant> => {
	if (!response) return [];
	const { data } = response;

	return data?.filter((x) => x).map((x) => dataToTenant(x)) || [];
};
