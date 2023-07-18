import { FC } from "react";
import { TTableAction } from "shared/react-table/types";
import { IconButton, Stack } from "@mui/material";
import { actionIconFactory } from "shared/react-table/factories/action-icon-factory";

export const ActionCell: FC<{ rowId?: number; actions: Array<TTableAction> }> = ({
	rowId,
	actions,
}) => {
	return (
		<Stack direction="row">
			{actions.map((action) => {
				return (
					<IconButton
						onClick={() => action.onClick?.(rowId)}
						sx={!rowId ? { border: "0.5px solid" } : {}}
					>
						{actionIconFactory(action.actionType)}
					</IconButton>
				);
			})}
		</Stack>
	);
};
