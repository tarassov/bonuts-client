import { Grid } from "@mui/material";
import { BntFormContextProvider } from "shared/ui/form/context/bnt-form-provider";
import { BntFormFieldList } from "shared/ui/form/bnt-form-field-list";
import { FC, useEffect } from "react";
import { TFormProps, TFormValue } from "shared/ui/form/types/bnt-form";
import { useFormContext, useFormState } from "react-hook-form";
import { BntFormGroups } from "shared/ui/form/bnt-form-groups";
import { BntFormSubmit } from "shared/ui/form/bnt-form-submit";
import { BntBox } from "shared/ui/box/bnt-box";

export const BntFormBody: FC<
	TFormProps<any> & {
		values: Record<string, TFormValue>;
		onDiscard: VoidFunction;
		error?: string;
	}
> = ({
	fields,
	groups,
	groupGap,
	hasInitial,
	initialValues,
	formId,
	submitCaption,
	children,
	values,
	onDiscard,
	error,
	keepValuesOnSubmit = true,
}) => {
	const { reset } = useFormContext();
	const formState = useFormState();
	const { isDirty, isSubmitSuccessful } = formState;

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset(initialValues, { keepValues: keepValuesOnSubmit });
		}
	}, [isSubmitSuccessful]);

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
							<BntFormGroups
								groupGap={groupGap}
								formId={formId}
								groups={groups}
								hasInitial={hasInitial}
								fields={fields}
							/>
						)}
					</>
				</BntFormContextProvider>
			</Grid>
			<BntFormSubmit
				visible={!!(isDirty || error)}
				onCancelClick={onCancelClick}
				submitCaption={submitCaption}
			/>
		</BntBox>
	);
};
