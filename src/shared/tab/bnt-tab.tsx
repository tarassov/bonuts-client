import { FC } from "react";
import { Tab, TabProps } from "@mui/material";
import { CommonStrings } from "constants/dictionary";

const a11yProps = (index: number, key?: string) => {
	return {
		id: `bnt-tab${key ? `-${key}` : CommonStrings.EMPTY_STRING}-${index}`,
		"aria-controls": `bnt-tab-panel${key ? `-${key}` : CommonStrings.EMPTY_STRING}-${index}`,
	};
};
export const BntTab: FC<TabProps & { tabValue: number; prefix?: string }> = ({
	prefix,
	tabValue,
	...props
}) => {
	return <Tab {...props} {...a11yProps(tabValue, prefix)} />;
};
