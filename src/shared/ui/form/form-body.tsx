import { FC, useEffect } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { Grid } from "@mui/material";

import { BntBox } from "@/shared/ui/box";

import { BntFormFieldList } from "./bnt-form-field-list";
import { BntFormGroups } from "./bnt-form-groups";
import { BntFormSubmit } from "./bnt-form-submit";
import { BntFormContextProvider } from "./context/bnt-form-provider";
import { TFormProps, TFormValue } from "./types/bnt-form";

export const BntFormBody: FC<
	TFormProps<any> & {
		values: Record<string, TFormValue>;
		onDiscard: VoidFunction;
		error?: string;
	}
> = ({ fields, groups, groupGap, hasInitial, initialValues, formId, submitCaption, submitButtonVariant, children, values, onDiscard, error, keepValuesOnSubmit = true }) => {
	const { reset } = useFormContext();
	const formState = useFormState();
	const { isDirty, isSubmitSuccessful } = formState;

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset(initialValues, { keepValues: keepValuesOnSubmit });
		}
	}, [initialValues, isSubmitSuccessful, keepValuesOnSubmit, reset]);

	useEffect(() => {
		reset(initialValues, { keepValues: keepValuesOnSubmit });
	}, [initialValues, keepValuesOnSubmit, reset]);

	const onCancelClick = () => {
		onDiscard();
		reset(initialValues);
	};

	return (
		<BntBox className="position-relative">
			<Grid container spacing={2} className="mb-3">
				<BntFormContextProvider values={values} initialValues={initialValues}>
					<>
						{children}
						{!groups?.length ? (
							<BntFormFieldList formId={formId} hasInitial={hasInitial} fields={fields} />
						) : (
							<BntFormGroups groupGap={groupGap} formId={formId} groups={groups} hasInitial={hasInitial} fields={fields} />
						)}
					</>
				</BntFormContextProvider>
			</Grid>
			<BntFormSubmit visible={!!(isDirty || error)} onCancelClick={onCancelClick} submitCaption={submitCaption} submitButtonVariant={submitButtonVariant} />
		</BntBox>
	);
};
