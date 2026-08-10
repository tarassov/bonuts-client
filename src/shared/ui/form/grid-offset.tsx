import { FC } from "react";
import { Grid2 as Grid } from "@mui/material";

import { TSizeProps } from "./types/bnt-form";

export const GridOffset: FC<{ offset?: TSizeProps }> = ({ offset }) => {
	if (!offset) return null;

	return <Grid size={offset} sx={{ p: 0 }} />;
};
