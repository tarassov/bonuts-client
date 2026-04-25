import { Grid } from "@mui/material";

import { BntFormItem, TFormField } from "@/shared/ui/form";

import type { TProfile } from "@/types/model";

export function ProfileFieldList({ fields, formId }: { fields: Array<TFormField<TProfile>>; formId: string }) {
	return (
		<Grid container spacing={2}>
			{fields.map((field) => {
				const id = `${formId}|${String(field.name)}`;
				return <BntFormItem key={id} id={id} field={field} />;
			})}
		</Grid>
	);
}
