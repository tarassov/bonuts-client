import { FC } from "react";
import { IconButton, Stack } from "@mui/material";
import { CheckCircleOutline, HighlightOffOutlined } from "@mui/icons-material";

export const RequestActionsCell: FC<{
	onCheckClick: VoidFunction;
	onRollbackClick: VoidFunction;
	hideEdit?: boolean;
	hideRollback?: boolean;
}> = ({ onCheckClick, onRollbackClick, hideEdit, hideRollback }) => {
	return (
		<Stack direction="row">
			{!hideEdit && (
				<IconButton onClick={() => onCheckClick()}>
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
