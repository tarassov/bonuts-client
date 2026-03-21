import { useEffect, useMemo } from "react";
import { useFormContext, useFormState } from "react-hook-form";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntBox } from "shared/ui/box/bnt-box";
import { BntFormSubmit } from "shared/ui/form/bnt-form-submit";
import { BntFormContextProvider } from "shared/ui/form/context/bnt-form-provider";
import { TFormField } from "shared/ui/form/types/bnt-form";

import classes from "./profile-form.module.scss";
import { ProfileFormSection } from "./profile-form-section";
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
					<ProfileFormSection title={translate("Main information")} hint={translate("Name, surname and position")} fields={mainInfoFields} formId={formId} />
					<ProfileFormSection title={translate("Contacts")} hint={translate("Email and direct contact")} fields={contactFields} formId={formId} />
					<ProfileFormSection title={translate("About myself")} hint={translate("The most human part of the profile")} fields={bioFields} formId={formId} emphasized />
					<ProfileFormSection title={translate("Additional information")} hint={translate("Dates, circles and access")} fields={additionalFields} formId={formId} />
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
