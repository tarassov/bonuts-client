import { Box, BoxProps } from "@mui/material";
import { FC } from "react";

export const BntBox: FC<BoxProps> = (props) => {
	return <Box {...props} component="div" />;
};
