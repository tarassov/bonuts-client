import { FC } from "react";
import { FormControl, Grid } from "@mui/material";
import { GridOffset } from "shared/form/grid-offset";
import { TFormField } from "./types/bnt-form";
import { BntFormField } from "./bnt-form-field";

export const BntFormItem: FC<{
	field: TFormField<any>;
	id: string;
}> = ({ field, id }) => {
	const field_xs = field.xs ? field.xs : 12;
	const field_sm = field.sm ? field.sm : field_xs;
	const field_md = field.md ? field.md : field_sm;
	const field_lg = field.lg ? field.lg : field_md;
	return (
		<>
			<GridOffset offset={field.offset?.offsetBeforeElement} />
			<Grid item xs={field_xs} sm={field_sm} md={field_md} lg={field_lg}>
				<FormControl required={field.required} style={{ width: "100%" }}>
					<BntFormField id={id} field={field} />
				</FormControl>
			</Grid>
			<GridOffset offset={field.offset?.offsetAfterElement} />
		</>
	);
};
