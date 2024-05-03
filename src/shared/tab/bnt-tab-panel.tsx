import React, { FC } from "react";
import { BntBox } from "shared/box/bnt-box";

export type TabPanelProps = {
	children?: React.ReactNode;
	index: number;
	value: number;
	className?: string;
	boxClassName?: string;
	maxWidth?: number;
};
export const BntTabPanel: FC<TabPanelProps> = (props) => {
	const { children, value, index, boxClassName, maxWidth, ...other } = props;
	return (
		<BntBox
			role="tabpanel"
			hidden={value !== index}
			id={`bnt-tabpanel-${index}`}
			aria-labelledby={`bnt-tab-${index}`}
			{...other}
			sx={{ maxWidth, margin: "0 auto" }}
		>
			{value === index && (
				<BntBox component="div" className={boxClassName}>
					{children}
				</BntBox>
			)}
		</BntBox>
	);
};
