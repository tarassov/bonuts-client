import { usePutProfilesByIdMutation } from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { TProfile } from "@/types/model";

export const useUpdateProfile = () => {
	const [putProfile] = usePutProfilesByIdMutation();
	const authTenant = useAppSelector(authTenantSelector);
	const updateProfile = async (
		profile: TProfile,
		values: Record<string, any>,
		callback?: VoidFunction
	) => {
		const res = await putProfile({
			id: profile?.id.toString(),
			body: { ...values, tenant: authTenant },
		});
		callback?.();
		return res;
	};

	return { updateProfile };
};
