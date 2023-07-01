import { TSizeProps } from "shared/form/types/bnt-form";
import { FC } from "react";
import { Grid } from "@mui/material";

export const GridOffset: FC<{ offset?: TSizeProps; key: string }> = ({ offset, key }) => {
	if (!offset) return null;
	return <Grid item style={{ padding: 0 }} key={key} {...offset} zeroMinWidth />;
};
