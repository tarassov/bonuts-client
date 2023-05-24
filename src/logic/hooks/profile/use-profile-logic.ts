import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "services/redux/store/store";
import { useGetProfileQuery, usePutProfilesByIdMutation } from "services/api/bonuts-api";
import { authActions } from "services/redux/slice/auth-slice";
import { apiProfileAdaptor } from "services/adaptor/api-profile-adaptor";
import { authProfileSelector, authTenantSelector } from "services/redux/selectors/auth-selector";
import { TProfile } from "@/types/model";

export const useProfileLogic = () => {
	const [putProfile] = usePutProfilesByIdMutation();
	const authProfile = useAppSelector(authProfileSelector);
	const authTenant = useAppSelector(authTenantSelector);
	const dispatch = useAppDispatch();
	const { data, error, isLoading, refetch } = useGetProfileQuery(
		{
			tenant: authTenant || undefined,
		},
		{ skip: !authTenant }
	);

	useEffect(() => {
		if (data) {
			const translated = apiProfileAdaptor(data);
			if (translated) dispatch(authActions.setProfile(translated));
		}
	}, [data]);

	const updateProfile = async (profile: TProfile, values: Record<string, any>) => {
		if (profile.id && authTenant) {
			const res = await putProfile({
				id: profile?.id.toString(),
				body: { ...values, tenant: authTenant },
			});
			refetch();
			return res;
		}
		return undefined;
	};

	return { profile: authProfile, isLoading, error, updateProfile, authTenant };
};
