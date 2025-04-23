import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

export const BntBox: FC<BoxProps> = (props) => {
	return <Box {...props} component="div" />;
};
