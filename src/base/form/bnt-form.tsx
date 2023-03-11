import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { TFormProps } from "../types/bnt-form";
import { Box, Grid } from "@mui/material";
import { BntFormItem } from "./bnt-form-item";
import { BNTTransparentButton } from "../buttons/transparent-button";
import { useBntTranslate } from "../../hooks/useBntTranslate";
import { Dictionary } from "../../constants/dictionary";
import _ from "lodash";

export const BntForm: FC<TFormProps> = ({
	fields,
	hasInitial,
	initialValues,
	formId,
	onLoad,
	submitCaption,
	onSubmit,
	onValidate,
}) => {
	const [values, setValues] = useState<Record<string, any>>({});
	const [hasChanges, setHasChanges] = useState(false);
	useEffect(() => {
		if (!Object.keys(values).length) {
			setValues({ ...initialValues } || {});
		}
	}, [initialValues]);

	const { translate } = useBntTranslate();
	const onChange = useCallback((event: ChangeEvent<any>) => {
		const newValues = { ...values, [event.target.name]: event.target.value };
		setHasChanges(!_.isEqual(newValues, initialValues));
		setValues(newValues);
	}, []);
	const onSubmitForm = (e: any) => {
		e.preventDefault();
		onSubmit?.(values);
	};
	const onDiscard = () => {
		setValues(initialValues || {});
		setHasChanges(false);
	};
	return (
		<>
			{(!hasInitial || initialValues) && (
				<form onSubmit={onSubmitForm}>
					<Box className={"position-relative"}>
						<Grid container spacing={2} className={"mb-10"}>
							{fields.map((field) => {
								const id = `${formId}|${field.name}`;
								return (
									<BntFormItem
										key={id}
										id={id}
										field={field}
										value={hasInitial ? values?.[field.name] : undefined}
										formId={formId}
										onChange={onChange}
									/>
								);
							})}
						</Grid>
						<Box className="right-10">
							<BNTTransparentButton
								color="secondary"
								onClick={onDiscard}
								disabled={!hasChanges}
							>
								{translate(Dictionary.DISCARD)}
							</BNTTransparentButton>
							<BNTTransparentButton type={"submit"}>
								{translate(submitCaption || Dictionary.SUBMIT)}
							</BNTTransparentButton>
						</Box>
					</Box>
				</form>
			)}
		</>
	);
};
