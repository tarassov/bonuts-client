import { FC } from "react";
import { IconButton, Stack } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";

export const RequestActionsCell: FC<{
	onEditClick: VoidFunction;
	onRollbackClick: VoidFunction;
	hideEdit?: boolean;
	hideRollback?: boolean;
}> = ({ onEditClick, onRollbackClick, hideEdit, hideRollback }) => {
	return (
		<Stack direction="row">
			{!hideEdit && (
				<IconButton onClick={() => onEditClick()}>
					<EditOutlined />
				</IconButton>
			)}
			{!hideRollback && (
				<IconButton onClick={() => onRollbackClick()}>
					<EditOutlined />
				</IconButton>
			)}
		</Stack>
	);
};
