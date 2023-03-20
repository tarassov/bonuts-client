import { useAppDispatch, useAppSelector } from "../../services/store/store";
import {
	useGetProfileQuery,
	usePutProfilesByIdMutation,
} from "../../services/api/bonuts-api";
import { useEffect } from "react";
import {
	authProfileSelector,
	authTenantSelector,
	setProfile,
} from "../../services/redux/auth-slice";
import { apiProfileToProfile } from "../../services/adaptor/api-profile-to-profile";
import { TProfile } from "../../types/model";

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
			translated && dispatch(setProfile(translated));
		}
	}, [data]);

	const updateProfile = async (
		profile: TProfile,
		values: Record<string, any>
	) => {
		profile?.id;
		if (profile.id && authTenant) {
			const res = await putProfile({
				id: profile?.id.toString(),
				body: { ...values, tenant: authTenant },
			});
			return res;
		}
	};

	return { profile: authProfile, isLoading, error, updateProfile };
};
