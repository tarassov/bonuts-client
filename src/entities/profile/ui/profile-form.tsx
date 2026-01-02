import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { Modules } from "constants/modules";

import { BntForm, type TFormProps } from "@/shared/ui/form";

import { useProfileFormFields } from "../model/use-profile-form-fields";

import type { TProfile } from "@/types/model";

interface IProfileFormProps {
	profile?: TProfile;
	isLoading?: boolean;
	error?: FetchBaseQueryError | SerializedError;

	updateProfile: (profile: TProfile, values: Record<string, any>) => void;
}

export function BntProfileForm({ profile, isLoading = false, error, updateProfile }: IProfileFormProps) {
	const { fields } = useProfileFormFields();

	const formProps: TFormProps<TProfile> = { fields, formId: "user-profile" };

	useLoader(Modules.Profile, isLoading && !error);

	const onSubmit = (values: TProfile) => (profile ? updateProfile(profile, { ...values, active: true }) : undefined);

	return <BntForm hasInitial initialValues={profile} {...formProps} onSubmit={onSubmit} />;
}
