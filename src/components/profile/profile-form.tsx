import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { TFormProps, TFormValue } from "shared/form/types/bnt-form";
import { BntForm } from "shared/form/bnt-form";
import { PutProfilesByIdApiResponse } from "services/api/bonuts-api";
import { useProfileFormFields } from "./hooks/use-profile-form-fields";

export const BntProfileForm = () => {
	const { profile, updateProfile } = useProfileLogic();
	const { fields } = useProfileFormFields(profile);
	const formProps: TFormProps = { fields, formId: "user-profile" };
	const initialValues = profile;
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
