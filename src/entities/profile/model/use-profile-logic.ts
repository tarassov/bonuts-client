import { useEffect } from "react";

import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { apiProfileAdaptor } from "services/adaptor/api-profile-adaptor";
import { useGetProfileQuery } from "services/api/bonuts-api";
import { accountsApi } from "services/api/extended/accounts-api";
import { authProfileSelector, authTenantSelector } from "services/redux/selectors/auth-selector";
import { authActions } from "services/redux/slice/auth-slice";
import { useAppDispatch, useAppSelector } from "services/redux/store/store";
import { invalidateId } from "services/redux/utils/rtk-cache-utils";

import { useUpdateProfile } from "./use-update-profile";

import type { TProfile } from "@/types/model";

const OPERATION_NAME = "profileLogic";

export const useProfileLogic = () => {
	const authProfile = useAppSelector(authProfileSelector);
	const authTenant = useAppSelector(authTenantSelector);
	const { updateProfile: update } = useUpdateProfile();
	const { openLoader, closeLoader } = useLoader(OPERATION_NAME);
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
		openLoader();
		return update(profile, values, refetch).finally(() => {
			closeLoader();
		});
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
