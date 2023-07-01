import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { TFormProps, TFormValue } from "shared/form/types/bnt-form";
import { BntForm } from "shared/form/bnt-form";
import { PutProfilesByIdApiResponse } from "services/api/bonuts-api";
import { useEffect } from "react";
import { Modules } from "constants/modules";
import { useLoader } from "shared/loader/hooks/use-loader";
import { useProfileFormFields } from "./hooks/use-profile-form-fields";
import { TProfile } from "@/types/model";

export const BntProfileForm = () => {
	const { profile, updateProfile, isLoading, error } = useProfileLogic();
	const { fields } = useProfileFormFields(profile);
	const { setLoading } = useLoader();
	const formProps: TFormProps<TProfile> = { fields, formId: "user-profile" };
	const initialValues = profile;

	useEffect(() => {
		setLoading(Modules.Profile, isLoading && !error);
	}, [isLoading, error]);
	const onSubmit = (
		values: Record<string, TFormValue>
	):
		| Promise<
				| { data: PutProfilesByIdApiResponse }
				| { error: FetchBaseQueryError | SerializedError }
				| undefined
		  >
		| undefined => {
		if (profile) {
			return updateProfile(profile, { ...values, active: true });
		}
		return undefined;
	};
	return <BntForm hasInitial initialValues={initialValues} {...formProps} onSubmit={onSubmit} />;
};
