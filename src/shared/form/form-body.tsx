import { Box, Grid, Stack } from "@mui/material";
import { BntFormContextProvider } from "shared/form/context/bnt-form-provider";
import { BntFormFieldList } from "shared/form/bnt-form-field-list";
import { BntTransparentButton } from "shared/buttons/transparent-button";
import { FC, useEffect } from "react";
import { TFormProps, TFormValue } from "shared/form/types/bnt-form";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useFormContext, useFormState } from "react-hook-form";
import { BntFormGroups } from "shared/form/bnt-form-groups";
import { texts_c, texts_s } from "services/localization/texts";

export const BntFormBody: FC<
	TFormProps<any> & {
		values: Record<string, TFormValue>;
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
	onDiscard,
}) => {
	const { translate } = useBntTranslate();
	const { reset } = useFormContext();
	const { isDirty, isSubmitSuccessful } = useFormState();

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({}, { keepValues: true });
		}
	}, [isSubmitSuccessful, reset]);

	const onCancelClick = () => {
		onDiscard();
		reset(initialValues);
	};

	return (
		<Box className="position-relative">
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
			<Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
				{isDirty && (
					<>
						<BntTransparentButton color="secondary" onClick={onCancelClick}>
							{translate(texts_c.cancel)}
						</BntTransparentButton>

						<BntTransparentButton type="submit">
							{submitCaption || translate(texts_s.save)}
						</BntTransparentButton>
					</>
				)}
			</Stack>
		</Box>
	);
};
