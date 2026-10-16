import type { PutProfilesByIdApiArg } from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";
import { emptyFunction } from "utils/empty-function";

import { authTenantSelector } from "@/shared/model/auth";

import { profilesApi } from "@/entities/profile";

import { type TProfile } from "@/types/model";

export type TUpdateProfileValues = Omit<PutProfilesByIdApiArg["body"], "tenant" | "first_name" | "last_name" | "position"> & {
	first_name?: string | null;
	last_name?: string | null;
	position?: string | null;
};

export const useUpdateProfile = () => {
	const [putProfile] = profilesApi.usePutProfilesByIdMutation();
	const authTenant = useAppSelector(authTenantSelector);
	const updateProfile = async (profile: TProfile, values: TUpdateProfileValues, callback: VoidFunction = emptyFunction) => {
		const body: PutProfilesByIdApiArg["body"] = {
			...values,
			first_name: values.first_name ?? undefined,
			last_name: values.last_name ?? undefined,
			position: values.position ?? undefined,
			tenant: authTenant,
		};

		const res = await putProfile({
			id: profile?.id.toString(),
			body,
		});

		callback();

		return res;
	};

	return { updateProfile };
};
