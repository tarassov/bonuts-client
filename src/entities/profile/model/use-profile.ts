import { useCallback, useMemo } from "react";
import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { apiProfileAdaptor } from "services/adaptor/api-profile-adaptor";
import { useGetProfileQuery } from "services/api/bonuts-api";
import { accountsApi } from "services/api/extended/accounts-api";
import { useAppDispatch } from "services/redux/store/store";
import { invalidateId } from "services/redux/utils/rtk-cache-utils";

import { useCurrentProfile } from "@/entities/profile";

import { useUpdateProfile } from "./use-update-profile";

import type { TProfile } from "@/types/model";

const OPERATION_NAME = "profileLogic";

export const useProfile = () => {
	const { authTenant } = useCurrentProfile();

	const { updateProfile: update } = useUpdateProfile();
	const { openLoader, closeLoader } = useLoader(OPERATION_NAME);
	const dispatch = useAppDispatch();
	const { data, error, isLoading } = useGetProfileQuery({ tenant: authTenant || undefined }, { skip: !authTenant });

	const profile = useMemo(() => {
		if (data) return apiProfileAdaptor(data);
	}, [data]);

	const updateProfile = async (newProfile: TProfile, values: Record<string, any>) => {
		openLoader();
		try {
			await update(newProfile, values);
		} finally {
			closeLoader();
		}
	};

	const invalidateDistribBalance = useCallback(() => {
		dispatch(accountsApi.util.invalidateTags(invalidateId("Accounts", profile?.distrib_account?.id)));
	}, [dispatch, profile?.distrib_account?.id]);

	const invalidateSelfBalance = useCallback(() => {
		dispatch(accountsApi.util.invalidateTags(invalidateId("Accounts", profile?.self_account?.id)));
	}, [dispatch, profile?.self_account?.id]);

	return {
		profile,
		isLoading,
		error,
		updateProfile,
		authTenant,
		invalidateSelfBalance,
		invalidateDistribBalance,
	};
};
