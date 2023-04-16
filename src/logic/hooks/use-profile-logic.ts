import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "services/store/store";
import {
	useGetProfileQuery,
	usePutProfilesByIdMutation,
} from "services/api/bonuts-api";
import { setProfile } from "services/redux/auth-slice";
import { apiProfileToProfile } from "services/adaptor/api-profile-to-profile";
import {
	authProfileSelector,
	authTenantSelector,
} from "services/selectors/auth-selector";
import { TProfile } from "@/types/model";

export const useProfileLogic = () => {
	const [putProfile] = usePutProfilesByIdMutation();
	const authProfile = useAppSelector(authProfileSelector);
	const authTenant = useAppSelector(authTenantSelector);
	const dispatch = useAppDispatch();
	const { data, error, isLoading } = useGetProfileQuery(
		{
			tenant: authTenant || undefined,
		},
		{ skip: !authTenant }
	);

	useEffect(() => {
		if (data) {
			const translated = apiProfileToProfile(data);
			if (translated) dispatch(setProfile(translated));
		}
	}, [data]);

	const updateProfile = async (
		profile: TProfile,
		values: Record<string, any>
	) => {
		if (profile.id && authTenant) {
			const res = await putProfile({
				id: profile?.id.toString(),
				body: { ...values, tenant: authTenant },
			});
			return res;
		}
		return undefined;
	};

	return { profile: authProfile, isLoading, error, updateProfile };
};
