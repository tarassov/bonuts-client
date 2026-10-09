import { useEffect, useMemo } from "react";
import { useFormContext, useFormState } from "react-hook-form";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { BntBox } from "@/shared/ui/box";
import type { TFormField } from "@/shared/ui/form";
import { BntFormContextProvider, BntFormSubmit } from "@/shared/ui/form";

import classes from "./profile-form.module.scss";
import { ProfileFormSection } from "./profile-form-section";
import { texts_a, texts_c, texts_e, texts_m, texts_n } from "@/services/localization/texts";
import type { TProfile } from "@/types/model";

export function ProfileFormLayout({
	fields,
	formId,
	initialValues,
	values,
	onDiscard,
	error,
}: {
	fields: Array<TFormField<TProfile>>;
	formId: string;
	initialValues?: Record<string, any>;
	values: Record<string, any>;
	onDiscard: VoidFunction;
	error?: string;
}) {
	const { translate } = useBntTranslate();
	const { reset } = useFormContext();
	const { isDirty, isSubmitSuccessful } = useFormState();

	const fieldsByName = useMemo(() => {
		return fields.reduce<Record<string, TFormField<TProfile>>>((acc, field) => {
			acc[String(field.name)] = field;
			return acc;
		}, {});
	}, [fields]);

	const getField = (name: keyof TProfile) => fieldsByName[String(name)];

	const mainInfoFields = [getField("first_name"), getField("last_name"), getField("position")].filter(Boolean) as Array<TFormField<TProfile>>;
	const contactFields = [getField("email"), getField("contact")].filter(Boolean) as Array<TFormField<TProfile>>;
	const bioFields = [getField("bio")].filter(Boolean) as Array<TFormField<TProfile>>;
	const additionalFields = [getField("birthdate"), getField("in_date"), getField("circles"), getField("roles")].filter(Boolean) as Array<TFormField<TProfile>>;

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset(initialValues, { keepValues: true });
		}
	}, [initialValues, isSubmitSuccessful, reset]);

	useEffect(() => {
		reset(initialValues, { keepValues: true });
	}, [initialValues, reset]);

	const handleCancelClick = () => {
		onDiscard();
		reset(initialValues);
	};

	const showSubmit = !!(isDirty || error);

	return (
		<BntBox className={classes.root}>
			<BntFormContextProvider values={values} initialValues={initialValues}>
				<div className={classes.content}>
					<ProfileFormSection title={translate(texts_m.main_information)} hint={translate(texts_n.name_surname_and_position)} fields={mainInfoFields} formId={formId} />
					<ProfileFormSection title={translate(texts_c.contacts)} hint={translate(texts_e.email_and_direct_contact)} fields={contactFields} formId={formId} />
					<ProfileFormSection title={translate(texts_a.about_myself)} hint={translate(texts_a.anything_you_want_to_share)} fields={bioFields} formId={formId} emphasized />
					<ProfileFormSection title={translate(texts_a.additional_information)} hint={translate(texts_a.and_other_important_information)} fields={additionalFields} formId={formId} />
				</div>
			</BntFormContextProvider>
			{showSubmit ? (
				<div data-testid="profile-form-submit" className={classes.submit}>
					<BntFormSubmit visible={!!(isDirty || error)} onCancelClick={handleCancelClick} />
				</div>
			) : null}
		</BntBox>
	);
}
