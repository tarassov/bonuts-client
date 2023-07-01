import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { FormContainer } from "react-hook-form-mui";
import { BntFormBody } from "shared/form/form-body";
import { DateFnsProvider } from "react-hook-form-mui/dist/date-fns";
import { ru } from "date-fns/locale";
import { TFormProps, TFormValue } from "./types/bnt-form";

export const BntForm: FC<TFormProps<any>> = ({
	fields,
	groups,
	groupGap,
	hasInitial,
	initialValues,
	formId,
	submitCaption,
	onSubmit,
	children,
	locale = ru,
}) => {
	const [values, setValues] = useState<Record<string, TFormValue>>({});
	const [initials, setInitials] = useState(initialValues);
	const [hasChanges, setHasChanges] = useState(false);

	useEffect(() => {
		const transformedInitials = _.mapValues(initialValues, (value, key) => {
			const field = fields?.find((x) => x.name === key);
			if (field?.convertSourceValue) {
				return field?.convertSourceValue?.(value);
			}
			return value;
		});

		if (!Object.keys(values).length) {
			setValues(transformedInitials || {});
		}
		setInitials(transformedInitials);
	}, [initialValues, fields]);

	const onChange = useCallback(
		(name: string, value: TFormValue) => {
			const newValues = { ...values, [name]: value };
			setHasChanges(!_.isEqual(newValues, initials));
			setValues(newValues);
		},
		[initials, values, setHasChanges]
	);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSubmitForm = (submitValues: any) => {
		onSubmit?.({ ...initialValues, ...values })?.then((response) => {
			if (response && !response.error) {
				setHasChanges(false);
				setInitials(values);
			}
		});
	};
	const onDiscard = () => {
		setValues(initials || {});
		setHasChanges(false);
	};
	return (
		<div>
			{(!hasInitial || initialValues) && (
				<DateFnsProvider adapterLocale={locale}>
					<FormContainer defaultValues={initialValues} onSuccess={onSubmitForm}>
						<BntFormBody
							fields={fields}
							groups={groups}
							groupGap={groupGap}
							values={values}
							onChange={onChange}
							formId={formId}
							hasInitial={hasInitial}
							initialValues={initialValues}
							submitCaption={submitCaption}
							hasChanges={hasChanges}
							onDiscard={onDiscard}
						>
							{children}
						</BntFormBody>
					</FormContainer>
				</DateFnsProvider>
			)}
		</div>
	);
};
