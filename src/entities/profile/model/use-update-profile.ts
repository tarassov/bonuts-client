import { emptyFunction } from "utils/empty-function";

import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth";

import { profilesApi } from "@/entities/profile";

import { type TProfile } from "@/types/model";

export const useUpdateProfile = () => {
	const [putProfile] = profilesApi.usePutProfilesByIdMutation();
	const authTenant = useAppSelector(authTenantSelector);
	const updateProfile = async (
		profile: TProfile,
		values: Record<string, any>,
		callback: VoidFunction = emptyFunction
	) => {
		const res = await putProfile({
			id: profile?.id.toString(),
			body: { ...values, tenant: authTenant },
		});

		callback();

		return res;
	};

	return { updateProfile };
};
