import { useEffect, useMemo } from "react";

import { apiProfileAdaptor } from "services/adaptor/api-profile-adaptor";
import { useGetProfileQuery } from "services/api/bonuts-api";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { useAppSelector } from "services/redux/store/store";

export const useCurrentAuth = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, error, isLoading } = useGetProfileQuery({ tenant: authTenant || undefined }, { skip: !authTenant });

	const profile = useMemo(() => apiProfileAdaptor(data), [data]);

	return { profile, isLoading, error, authTenant };
};
