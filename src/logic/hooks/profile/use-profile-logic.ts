import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "services/redux/store/store";
import { useGetProfileQuery } from "services/api/bonuts-api";
import { authActions } from "services/redux/slice/auth-slice";
import { apiProfileAdaptor } from "services/adaptor/api-profile-adaptor";
import { authProfileSelector, authTenantSelector } from "services/redux/selectors/auth-selector";
import { accountsApi } from "services/api/extended/accounts-api";
import { invalidateId } from "services/redux/utils/rtk-cache-utils";
import { useUpdateProfile } from "logic/hooks/profile/use-update-profile";
import { TProfile } from "@/types/model";

export const useProfileLogic = () => {
	const authProfile = useAppSelector(authProfileSelector);
	const authTenant = useAppSelector(authTenantSelector);
	const { updateProfile: update } = useUpdateProfile();
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
		return update(profile, values, refetch);
	};

	const invalidateDistribBalance = () => {
		dispatch(
			accountsApi.util.invalidateTags(invalidateId("Accounts", authProfile?.distrib_account?.id))
		);
	};
	const invalidateSelfBalance = () => {
		dispatch(
			accountsApi.util.invalidateTags(invalidateId("Accounts", authProfile?.self_account?.id))
		);
	};

	return {
		profile: authProfile,
		isLoading,
		error,
		updateProfile,
		authTenant,
		invalidateSelfBalance,
		invalidateDistribBalance,
	};
};
