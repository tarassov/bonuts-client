import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { useGetProfileQuery } from "../../services/api/bonuts-api";
import { useEffect } from "react";
import {
	authProfileSelector,
	authTenantSelector,
	setProfile,
} from "../../services/redux/auth-slice";
import { apiProfileToProfile } from "../../services/translator/api-profile-to-profile";

export const useProfileLogic = () => {
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

	return { profile: authProfile, isLoading };
};
