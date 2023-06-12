import { FC } from "react";
import { IconButton, Stack } from "@mui/material";
import { CheckCircleOutline, HighlightOffOutlined } from "@mui/icons-material";

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
					<CheckCircleOutline color="primary" />
				</IconButton>
			)}
			{!hideRollback && (
				<IconButton onClick={() => onRollbackClick()}>
					<HighlightOffOutlined color="error" />
				</IconButton>
			)}
		</Stack>
	);
};
