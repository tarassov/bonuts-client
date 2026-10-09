import { FC } from "react";
import { IconButton, Stack } from "@mui/material";

import { actionIconFactory } from "./action-icon-factory";
import type { TTableAction } from "./types";

export const ActionCell: FC<{ rowId?: number; actions: Array<TTableAction> }> = ({ rowId, actions }) => {
	return (
		<Stack direction="row">
			{actions.map((action) => {
				return (
					<IconButton onClick={() => action.onClick?.(rowId)} sx={!rowId ? { border: "0.5px solid" } : {}}>
						{actionIconFactory(action.actionType)}
					</IconButton>
				);
			})}
		</Stack>
	);
};
