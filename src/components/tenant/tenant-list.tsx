import { Grid } from "@mui/material";
import { BntTypography } from "shared/typography/typography";
import { BntDivider } from "shared/divider/bnt-divider";
import { FC } from "react";

export const TenantList: FC<{ children: React.ReactNode; title: string }> = ({
	children,
	title,
}) => {
	return (
		<div className="mb-8">
			<BntTypography variant="subtitle1" className="ml-1">
				{title}
			</BntTypography>
			<BntDivider />
			<Grid
				container
				rowSpacing={{ xs: 2 }}
				columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				className="mt-1"
			>
				{children}
			</Grid>
		</div>
	);
};
