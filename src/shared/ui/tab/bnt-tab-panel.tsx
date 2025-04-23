import React, { FC } from "react";
import { BntBox } from "shared/ui/box/bnt-box";

export type TabPanelProps = {
	children?: React.ReactNode;
	index: number;
	value: number;
	className?: string;
	boxClassName?: string;
};
export const BntTabPanel: FC<TabPanelProps> = (props) => {
	const { children, value, index, boxClassName, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`bnt-tabpanel-${index}`}
			aria-labelledby={`bnt-tab-${index}`}
			{...other}
		>
			{value === index && (
				<BntBox component="div" className={boxClassName}>
					{children}
				</BntBox>
			)}
		</div>
	);
};
