import { FC, Fragment } from "react";
import { Grid2 as Grid } from "@mui/material";

import { BntFormFieldList } from "./bnt-form-field-list";
import { BntFormGroupHeader } from "./bnt-form-group-header";
import { GridOffset } from "./grid-offset";
import { TFieldGroup, TFormField, TFormProps } from "./types/bnt-form";

export const BntFormGroups: FC<
	Pick<TFormProps<any>, "fields" | "formId" | "hasInitial" | "groupGap"> & {
		groups: Array<TFieldGroup>;
	}
> = ({ fields, formId, hasInitial, groups, groupGap }) => {
	return (
		<Grid container gap={groupGap}>
			{groups.map((group) => {
				const { content, description, headerContent, xs, sm, lg, md, gap, id, offset, padding, sx, title, ...rest } = group;
				const groupFields = fields?.filter((x: TFormField<any>) => x.group === id || (x.group === undefined && id === 0)) || [];
				return (
					<Fragment key={group.id}>
						<GridOffset offset={offset?.offsetBeforeElement} />
						<Grid
							size={{ xs, sm, md, lg }}
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
							<BntFormGroupHeader description={description} headerContent={headerContent} title={title} />
							{content}
							{group?.groups?.length && <BntFormGroups formId={formId} groups={group.groups} fields={fields} hasInitial={hasInitial} groupGap={group.gap} />}
							{groupFields.length > 0 && (
								<Grid container columnSpacing={2} rowSpacing={2}>
									<BntFormFieldList formId={formId} hasInitial={hasInitial} fields={groupFields} />
								</Grid>
							)}
						</Grid>
						<GridOffset offset={offset?.offsetAfterElement} />
					</Fragment>
				);
			})}
		</Grid>
	);
};
