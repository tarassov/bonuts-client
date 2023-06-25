import { FC } from "react";
import { TFieldGroup, TFormProps } from "shared/form/types/bnt-form";
import { BntFormFieldList } from "shared/form/bnt-form-field-list";
import { Grid } from "@mui/material";

export const BntFormGroups: FC<
	Pick<TFormProps, "fields" | "formId" | "hasInitial" | "groupGap"> & { groups: Array<TFieldGroup> }
> = ({ fields, formId, hasInitial, groups, groupGap }) => {
	return (
		<Grid container gap={groupGap}>
			{groups.map((group) => {
				const { xs, sm, lg, md, gap, id, padding, ...rest } = group;

				return (
					<Grid
						item
						xs={xs}
						sm={sm}
						lg={lg}
						md={md}
						gap={gap}
						{...rest}
						key={id}
						sx={{ pl: 2, ...padding }}
					>
						<Grid container spacing={2}>
							<BntFormFieldList
								formId={formId}
								hasInitial={hasInitial}
								fields={fields?.filter(
									(x) => x.group === id || (x.group === undefined && id === 0)
								)}
							/>
						</Grid>
					</Grid>
				);
			})}
		</Grid>
	);
};
