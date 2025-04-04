import { FC } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TFormProps, TFormValue } from "shared/ui/form/types/bnt-form";

import { BntForm } from "shared/ui/form/bnt-form";
import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { Modules } from "constants/modules";

import { useProfileFormFields } from "../model/use-profile-form-fields";

import type { TProfile } from "@/types/model";

export const BntProfileForm: FC<{
	profile?: TProfile;
	isLoading?: boolean;
	error?: FetchBaseQueryError | SerializedError;
	updateProfile: (profile: TProfile, values: Record<string, any>) => void;
}> = ({ profile, isLoading = false, error, updateProfile }) => {
	const { fields } = useProfileFormFields();

	const formProps: TFormProps<TProfile> = { fields, formId: "user-profile" };
	const initialValues = profile;

	useLoader(Modules.Profile, isLoading && !error);

	const onSubmit = (values: Record<string, TFormValue>) => {
		if (profile) {
			return updateProfile(profile, { ...values, active: true });
		}
		return undefined;
	};
	return <BntForm hasInitial initialValues={initialValues} {...formProps} onSubmit={onSubmit} />;
};
