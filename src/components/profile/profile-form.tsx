import { useProfileLogic } from "../../logic/hooks/use-profile-logic";
import {
	TFieldSize,
	TFieldType,
	TFormField,
	TFormProps,
	TFormValue,
} from "../../shared/form/types/bnt-form";
import { BntForm } from "../../shared/form/bnt-form";
import { useBntTranslate } from "../../hooks/use-bnt-translate";
import { Roles } from "../../constants/roles";
import { isAdmin, UserLogic } from "../../logic/utils/user-utils";
import { getProfileFormFields } from "./utils/get-profile-form-fields";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { PutProfilesByIdApiResponse } from "../../services/api/bonuts-api";

export const BntProfileForm = () => {
	const { profile, updateProfile } = useProfileLogic();
	const { translate } = useBntTranslate();
	const fields: Array<TFormField> = getProfileFormFields(profile);
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
	};
	return (
		<>
			<BntForm
				hasInitial={true}
				initialValues={initialValues}
				{...formProps}
				onSubmit={onSubmit}
			/>
		</>
	);
};
