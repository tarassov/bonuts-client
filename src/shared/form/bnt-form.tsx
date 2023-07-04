import { FC, useEffect, useState } from "react";
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
	const [initials, setInitials] = useState<Record<string, TFormValue> | undefined>(undefined);

	useEffect(() => {
		if (initialValues) {
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
		}
	}, [initialValues, fields]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSubmitForm = (submitValues: any) => {
		onSubmit?.(submitValues)?.then((response) => {
			if (response && !response.error) {
				setInitials(submitValues);
			}
		});
	};
	const onDiscard = () => {
		setValues(initials || {});
	};
	if (!initials && hasInitial) return null;
	return (
		<div>
			<DateFnsProvider adapterLocale={locale}>
				<FormContainer defaultValues={initials} onSuccess={onSubmitForm}>
					<BntFormBody
						fields={fields}
						groups={groups}
						groupGap={groupGap}
						values={values}
						formId={formId}
						hasInitial={hasInitial}
						initialValues={initials}
						submitCaption={submitCaption}
						onDiscard={onDiscard}
					>
						{children}
					</BntFormBody>
				</FormContainer>
			</DateFnsProvider>
		</div>
	);
};
