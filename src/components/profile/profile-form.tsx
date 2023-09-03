import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TFormProps, TFormValue } from "shared/form/types/bnt-form";
import { BntForm } from "shared/form/bnt-form";
import { FC, useEffect } from "react";
import { Modules } from "constants/modules";
import { useLoader } from "shared/loader/hooks/use-loader";
import { useProfileFormFields } from "./hooks/use-profile-form-fields";
import { TProfile } from "@/types/model";

export const BntProfileForm: FC<{
	profile?: TProfile;
	isLoading?: boolean;
	error?: FetchBaseQueryError | SerializedError;
	updateProfile: (profile: TProfile, values: Record<string, any>) => void;
}> = ({ profile, isLoading = false, error, updateProfile }) => {
	const { fields } = useProfileFormFields(profile);
	const { setLoading } = useLoader();
	const formProps: TFormProps<TProfile> = { fields, formId: "user-profile" };
	const initialValues = profile;

	useEffect(() => {
		setLoading(Modules.Profile, isLoading && !error);
	}, [isLoading, error]);
	const onSubmit = (values: Record<string, TFormValue>) => {
		if (profile) {
			return updateProfile(profile, { ...values, active: true });
		}
		return undefined;
	};
	return <BntForm hasInitial initialValues={initialValues} {...formProps} onSubmit={onSubmit} />;
};
