import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import _ from "lodash";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { Dictionary } from "constants/dictionary";
import { TFormProps, TFormValue } from "./types/bnt-form";
import { BntTransparentButton } from "../buttons/transparent-button";
import { BntFormContextProvider } from "./context/bnt-form-provider";
import { BntFormFieldList } from "./bnt-form-field-list";

export const BntForm: FC<TFormProps> = ({
	fields,
	hasInitial,
	initialValues,
	formId,
	// onLoad,
	submitCaption,
	onSubmit,
	// onValidate,
	children,
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

	const { translate } = useBntTranslate();
	const onChange = useCallback(
		(name: string, value: TFormValue) => {
			const newValues = { ...values, [name]: value };
			setHasChanges(!_.isEqual(newValues, initials));
			setValues(newValues);
		},
		[initials, values, setHasChanges]
	);
	const onSubmitForm = (e: SyntheticEvent) => {
		e.preventDefault();
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
				<form onSubmit={onSubmitForm}>
					<Box className="position-relative">
						<Grid container spacing={2} className="mb-10">
							<BntFormContextProvider
								onChange={onChange}
								values={values}
								initialValues={initialValues}
							>
								<>
									{children}
									<BntFormFieldList formId={formId} hasInitial={hasInitial} fields={fields} />
								</>
							</BntFormContextProvider>
						</Grid>
						<Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
							{hasChanges && (
								<>
									<BntTransparentButton
										color="secondary"
										onClick={onDiscard}
										disabled={!hasChanges}
									>
										{translate(Dictionary.DISCARD)}
									</BntTransparentButton>
									<BntTransparentButton type="submit" disabled={!hasChanges}>
										{translate(submitCaption || Dictionary.SUBMIT)}
									</BntTransparentButton>
								</>
							)}
						</Stack>
					</Box>
				</form>
			)}
		</div>
	);
};
