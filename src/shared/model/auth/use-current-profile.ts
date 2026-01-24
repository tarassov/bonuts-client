import { useMemo } from "react";
import { authTenantSelector } from "shared/model/auth/auth-selector";

import { apiProfileAdaptor } from "services/adaptor/api-profile-adaptor";
import { useGetProfileQuery } from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";

export const useCurrentProfile = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, error, isLoading } = useGetProfileQuery({ tenant: authTenant || undefined }, { skip: !authTenant });

	const profile = useMemo(() => apiProfileAdaptor(data), [data]);

	const currentRoles = useMemo(() => profile?.roles || [], [profile?.roles]);

	return { profile, currentRoles, isLoading, error, authTenant };
};
