import { Box, Grid, Stack } from "@mui/material";
import { BntFormContextProvider } from "shared/form/context/bnt-form-provider";
import { BntFormFieldList } from "shared/form/bnt-form-field-list";
import { BntTransparentButton } from "shared/buttons/transparent-button";
import { Dictionary } from "constants/dictionary";
import { FC } from "react";
import { TFormProps, TFormValue } from "shared/form/types/bnt-form";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useFormContext } from "react-hook-form";
import { BntFormGroups } from "shared/form/bnt-form-groups";

export const BntFormBody: FC<
	TFormProps<any> & {
		onChange: (name: string, value: TFormValue) => void;
		values: Record<string, TFormValue>;
		hasChanges: boolean;
		onDiscard: VoidFunction;
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
	onChange,
	hasChanges,
	onDiscard,
}) => {
	const { translate } = useBntTranslate();
	const methods = useFormContext();

	const onCancelClick = () => {
		onDiscard();
		methods.reset(initialValues);
	};

	return (
		<Box className="position-relative">
			<Grid container spacing={2} className="mb-3">
				<BntFormContextProvider onChange={onChange} values={values} initialValues={initialValues}>
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
			<Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
				{hasChanges && (
					<>
						<BntTransparentButton variant="outlined" color="secondary" onClick={onCancelClick}>
							{translate(Dictionary.DISCARD)}
						</BntTransparentButton>

						<BntTransparentButton variant="outlined" type="submit">
							{translate(submitCaption || Dictionary.SUBMIT)}
						</BntTransparentButton>
					</>
				)}
			</Stack>
		</Box>
	);
};
