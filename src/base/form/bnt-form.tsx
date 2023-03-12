import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { TFormProps, TFormValue } from "./types/bnt-form";
import { Box, Grid } from "@mui/material";
import { BNTTransparentButton } from "../buttons/transparent-button";
import { useBntTranslate } from "../../hooks/useBntTranslate";
import { Dictionary } from "../../constants/dictionary";
import _ from "lodash";
import { BntFormContextProvider } from "./context/bnt-form-context";
import { BntFormFieldList } from "./bnt-form-field-list";

export const BntForm: FC<TFormProps> = ({
	fields,
	hasInitial,
	initialValues,
	formId,
	onLoad,
	submitCaption,
	onSubmit,
	onValidate,
	children,
}) => {
	const [values, setValues] = useState<Record<string, TFormValue>>({});
	const [initials, setInitials] = useState(initialValues);
	const [hasChanges, setHasChanges] = useState(false);
	useEffect(() => {
		if (!Object.keys(values).length) {
			setValues({ ...initialValues } || {});
		}
		setInitials(initialValues);
	}, [initialValues]);

	const { translate } = useBntTranslate();
	const onChange = useCallback((name: string, value: TFormValue) => {
		const newValues = { ...values, [name]: value };
		setHasChanges(!_.isEqual(newValues, initials));
		setValues(newValues);
	}, []);
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
		<>
			{(!hasInitial || initialValues) && (
				<form onSubmit={onSubmitForm}>
					<Box className={"position-relative"}>
						<Grid container spacing={2} className={"mb-10"}>
							<BntFormContextProvider onChange={onChange} values={values}>
								<>
									{children}
									<BntFormFieldList
										formId={formId}
										hasInitial={hasInitial}
										fields={fields}
									/>
								</>
							</BntFormContextProvider>
						</Grid>
						<Box className="right-10">
							{hasChanges && (
								<>
									<BNTTransparentButton
										color="secondary"
										onClick={onDiscard}
										disabled={!hasChanges}
									>
										{translate(Dictionary.DISCARD)}
									</BNTTransparentButton>
									<BNTTransparentButton type={"submit"} disabled={!hasChanges}>
										{translate(submitCaption || Dictionary.SUBMIT)}
									</BNTTransparentButton>
								</>
							)}
						</Box>
					</Box>
				</form>
			)}
		</>
	);
};
