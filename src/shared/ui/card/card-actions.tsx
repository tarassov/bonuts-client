import { CardActions, CardActionsProps } from "@mui/material";
import { FC } from "react";

export const BntCardActions: FC<CardActionsProps> = (props) => {
	return <CardActions {...props} />;
};
