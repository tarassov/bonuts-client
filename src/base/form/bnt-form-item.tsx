import { TFormField } from "../types/bnt-form";
import { ChangeEvent, FC } from "react";
import { Grid } from "@mui/material";
import { BntImage } from "./bnt-image";
import TextField from "@mui/material/TextField";
import { BntFormField } from "./bnt-form-field";
export const BntFormItem: FC<{
	field: TFormField;
	value?: any;
	formId: string;
	onChange: (e: ChangeEvent<any>) => void;
	id: string;
}> = ({ field, value, formId, onChange, id }) => {
	console.log(field);
	const field_xs = field.xs ? field.xs : 12;
	const field_sm = field.sm ? field.sm : field_xs;
	const field_md = field.md ? field.md : field_sm;
	const field_lg = field.lg ? field.lg : field_md;
	return (
		<Grid
			item
			key={field.name.concat("_key")}
			xs={field_xs}
			sm={field_sm}
			md={field_md}
			lg={field_lg}
		>
			{field.image && value !== undefined && (
				<BntImage src={value.url} alt="not found" />
			)}
			{!field.image && (
				<BntFormField
					id={id}
					field={field}
					value={value}
					formId={formId}
					onChange={onChange}
				/>
			)}
		</Grid>
	);
};
