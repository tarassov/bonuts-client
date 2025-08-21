import { FC, useEffect, useState } from "react";
import { FormContainer } from "react-hook-form-mui";
import { DateFnsProvider } from "react-hook-form-mui/dist/date-fns";
import _ from "lodash";

import { BntFormBody } from "shared/ui/form/form-body";
import { useLocale } from "shared/ui/locale/hooks/use-locale";

import { TFormFieldSourceItem, TFormProps, TFormValue } from "./types/bnt-form";

export function BntForm<T extends Record<string, any>>({
	fields,
	groups,
	groupGap,
	hasInitial,
	initialValues,
	formId,
	submitCaption,
	onSubmit,
	children,
	keepValuesOnSubmit,
	resolver,
}: TFormProps<T>) {
	const [values, setValues] = useState<Record<string, TFormValue>>({});
	const [error, setError] = useState<string>();
	const [initials, setInitials] = useState<Record<string, TFormValue> | undefined>(undefined);
	const locale = useLocale();

	useEffect(() => {
		if (initialValues) {
			const transformedInitials = _.mapValues(initialValues, (value, key) => {
				const field = fields?.find((x) => x.name === key);
				if (field?.valueToOption) {
					return field?.valueToOption?.(value);
				}
				return value;
			});

			if (!Object.keys(values).length) {
				setValues(transformedInitials || {});
			}
			setInitials(transformedInitials);
		}
	}, [initialValues, fields]);

	const onError = (message?: string) => {
		setError(message);
	};
	const onSubmitForm = async (submitValues: any) => {
		const transformedValues = Object.entries(submitValues).reduce((acc, [key, value]) => {
			const field = fields?.find((x) => x.name === key);

			if (field?.optionToValue) {
				const newValue = _.isArray(value)
					? value.map((x) => field?.optionToValue?.(x))
					: field.optionToValue(value as TFormFieldSourceItem);
				return { ...acc, [key]: newValue };
			}
			return { ...acc, [key]: value };
		}, submitValues);
		if (error) setError(undefined);
		try {
			const response = await onSubmit?.(transformedValues, onError);

			if (response && !response.error) {
				setInitials(submitValues);
			}
		} catch (e) {
			setError("saving error");
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
						initialValues={initials}
						submitCaption={submitCaption}
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
