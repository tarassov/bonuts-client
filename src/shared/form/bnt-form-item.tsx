import { FC } from "react";
import { FormControl, Grid } from "@mui/material";
import { TFormField } from "./types/bnt-form";
import { BntFormField } from "./bnt-form-field";

export const BntFormItem: FC<{
	field: TFormField;
	value?: any;
	id: string;
}> = ({ field, value, id }) => {
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
			<FormControl required={field.required} style={{ width: "100%" }}>
				<BntFormField id={id} field={field} value={value} />
			</FormControl>
		</Grid>
	);
};
