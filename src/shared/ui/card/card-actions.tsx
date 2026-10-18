import { FC } from "react";
import { CardActions, CardActionsProps } from "@mui/material";

export const BntCardActions: FC<CardActionsProps> = (props) => {
	return <CardActions {...props} />;
};
