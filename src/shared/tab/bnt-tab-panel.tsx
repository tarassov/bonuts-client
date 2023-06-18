import React, { FC } from "react";
import { Box } from "@mui/material";

export type TabPanelProps = {
	children?: React.ReactNode;
	index: number;
	value: number;
};
export const BntTabPanel: FC<TabPanelProps> = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`bnt-tabpanel-${index}`}
			aria-labelledby={`bnt-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
};
