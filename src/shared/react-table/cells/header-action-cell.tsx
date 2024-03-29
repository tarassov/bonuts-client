import { FC } from "react";
import { TTableAction } from "shared/react-table/types";
import { IconButton, Stack } from "@mui/material";
import { actionIconFactory } from "shared/react-table/factories/action-icon-factory";

export const HeaderActionCell: FC<{ actions: Array<TTableAction> }> = ({ actions }) => {
	return (
		<Stack direction="row">
			{actions.map((action) => {
				return (
					<IconButton onClick={() => action.onClick?.()}>
						{actionIconFactory(action.actionType)}
					</IconButton>
				);
			})}
		</Stack>
	);
};
