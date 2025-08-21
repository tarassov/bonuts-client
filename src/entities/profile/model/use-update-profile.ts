import { emptyFunction } from "utils/empty-function";

import { usePutProfilesByIdMutation } from "services/api/bonuts-api";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { useAppSelector } from "services/redux/store/store";

import { TProfile } from "@/types/model";

export const useUpdateProfile = () => {
	const [putProfile] = usePutProfilesByIdMutation();
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
