import { FC } from "react";
import { IconButton, Stack } from "@mui/material";

import { actionIconFactory } from "./action-icon-factory";
import type { TTableAction } from "./types";

export const HeaderActionCell: FC<{ actions: Array<TTableAction> }> = ({ actions }) => {
	return (
		<Stack direction="row">
			{actions.map((action) => {
				return <IconButton onClick={() => action.onClick?.()}>{actionIconFactory(action.actionType)}</IconButton>;
			})}
		</Stack>
	);
};
