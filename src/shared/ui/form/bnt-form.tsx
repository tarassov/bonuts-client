import { useEffect, useMemo, useState } from "react";
import { FormContainer } from "react-hook-form-mui";

import _ from "lodash";

import { present } from "shared/lib/type-guards";
import { BntFormBody } from "shared/ui/form/form-body";
import { useLocale } from "shared/ui/locale/hooks/use-locale";

import { TFormFieldSourceItem, TFormProps, TFormValue } from "./types/bnt-form";
import { DateFnsProvider } from "react-hook-form-mui/dist/date-fns";

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
				const newValue = _.isArray(value)
					? value.map((x) => field?.optionToValue?.(x))
					: field.optionToValue(value as TFormFieldSourceItem);
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
