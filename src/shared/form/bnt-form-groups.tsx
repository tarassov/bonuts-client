import { FC, Fragment } from "react";
import { TFieldGroup, TFormField, TFormProps } from "shared/form/types/bnt-form";
import { BntFormFieldList } from "shared/form/bnt-form-field-list";
import { Grid } from "@mui/material";
import { GridOffset } from "shared/form/grid-offset";

export const BntFormGroups: FC<
	Pick<TFormProps<any>, "fields" | "formId" | "hasInitial" | "groupGap"> & {
		groups: Array<TFieldGroup>;
	}
> = ({ fields, formId, hasInitial, groups, groupGap }) => {
	return (
		<Grid container gap={groupGap}>
			{groups.map((group) => {
				const { xs, sm, lg, md, gap, id, padding, sx, ...rest } = group;
				const groupFields =
					fields?.filter(
						(x: TFormField<any>) => x.group === id || (x.group === undefined && id === 0)
					) || [];
				return (
					<Fragment key={group.id}>
						<GridOffset offset={group.offset?.offsetBeforeElement} />
						<Grid
							item
							xs={xs}
							sm={sm}
							lg={lg}
							md={md}
							gap={gap}
							{...rest}
							key={id}
							sx={(theme) => {
								return {
									p: 2,
									...padding,
									...group.sx?.(theme),
								};
							}}
						>
							{group?.groups?.length && (
								<BntFormGroups
									formId={formId}
									groups={group.groups}
									fields={fields}
									hasInitial={hasInitial}
									groupGap={group.gap}
								/>
							)}
							{groupFields.length > 0 && (
								<Grid container spacing={2}>
									<BntFormFieldList formId={formId} hasInitial={hasInitial} fields={groupFields} />
								</Grid>
							)}
						</Grid>
						<GridOffset offset={group.offset?.offsetAfterElement} />
					</Fragment>
				);
			})}
		</Grid>
	);
};
