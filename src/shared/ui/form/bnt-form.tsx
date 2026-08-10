import { useEffect, useMemo, useState } from "react";
import { FormContainer } from "react-hook-form-mui";

import _ from "lodash";

import { present } from "@/shared/lib/type-guards";
import { DateFnsProvider, useDateLocale } from "@/shared/ui/locale";

import { BntFormBody } from "./form-body";
import { TFormFieldSourceItem, TFormProps, TFormValue } from "./types/bnt-form";
export function BntForm<T extends Record<string, any>>({
	fields,
	groups,
	groupGap,
	hasInitial,
	initialValues,
	formId,
	submitCaption,
	submitButtonVariant,
	onSubmit,
	children,
	keepDirtyOnInitialValuesChange,
	keepValuesOnSubmit,
	isSubmitAlwaysVisible,
	isSubmitSticky,
	resolver,
}: TFormProps<T>) {
	const [values, setValues] = useState<Record<string, TFormValue>>({});
	const [error, setError] = useState<string>();
	const [initials, setInitials] = useState<Record<string, TFormValue> | undefined>(undefined);
	const locale = useDateLocale();

	const transformedInitials = useMemo(() => {
		if (!initialValues) return;

		return _.mapValues(initialValues, (value, key) => {
			const field = fields?.find((x) => x.name === key);
			if (field?.valueToOption) {
				return field?.valueToOption?.(value);
			}
			return value;
		});
	}, [initialValues, fields]);

	useEffect(() => {
		if (!transformedInitials) return;
		setValues((prev) => (present(prev) ? prev : transformedInitials));
		setInitials(transformedInitials || {});
	}, [transformedInitials]);

	const onError = (message?: string) => {
		setError(message);
	};
	const onSubmitForm = async (submitValues: any) => {
		const transformedValues = Object.entries(submitValues).reduce((acc, [key, value]) => {
			const field = fields?.find((x) => x.name === key);

			if (field?.optionToValue) {
				const newValue = _.isArray(value) ? value.map((x) => field?.optionToValue?.(x)) : field.optionToValue(value as TFormFieldSourceItem);
				return { ...acc, [key]: newValue };
			}
			return { ...acc, [key]: value };
		}, submitValues);
		if (error) setError(undefined);

		const response = await onSubmit?.(transformedValues, onError);

		if (response && !response.error) {
			setInitials(submitValues);
		}
		if (response?.error) {
			setError(response?.error || "saving error");
			throw new Error("saving error");
		}
	};

	const onDiscard = () => {
		setError(undefined);
		setValues(initials || {});
	};
	if (!initials && hasInitial) return null;

	return (
		<div>
			<DateFnsProvider adapterLocale={locale}>
				<FormContainer defaultValues={initials} onSuccess={onSubmitForm} resolver={resolver}>
					<BntFormBody
						fields={fields}
						groups={groups}
						groupGap={groupGap}
						values={values}
						formId={formId}
						hasInitial={hasInitial}
						keepValuesOnSubmit={keepValuesOnSubmit}
						keepDirtyOnInitialValuesChange={keepDirtyOnInitialValuesChange}
						isSubmitAlwaysVisible={isSubmitAlwaysVisible}
						isSubmitSticky={isSubmitSticky}
						initialValues={initials}
						submitCaption={submitCaption}
						submitButtonVariant={submitButtonVariant}
						onDiscard={onDiscard}
						error={error}
					>
						{children}
					</BntFormBody>
				</FormContainer>
			</DateFnsProvider>
		</div>
	);
}
