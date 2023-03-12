import { useProfileLogic } from "../../hooks/logic/useProfileLogic";
import {
	TFieldSize,
	TFieldType,
	TFormField,
	TFormProps,
	TFormValue,
} from "../../base/form/types/bnt-form";
import { BntForm } from "../../base/form/bnt-form";
import { useBntTranslate } from "../../hooks/useBntTranslate";
import { Roles } from "../../constants/roles";
import { isAdmin, UserLogic } from "../../services/logic-helpers/user-helper";
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
			return updateProfile(profile, values);
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
