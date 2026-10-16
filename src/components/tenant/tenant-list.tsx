import { FC } from "react";
import { Grid } from "@mui/material";

import { BntDivider } from "@/shared/ui/divider";
import { BntTypography } from "@/shared/ui/typography";

export const TenantList: FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
	return (
		<div className="mb-8">
			<BntTypography variant="subtitle1" className="ml-1">
				{title}
			</BntTypography>
			<BntDivider />
			<Grid container rowSpacing={{ xs: 2 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="mt-1">
				{children}
			</Grid>
		</div>
	);
};
