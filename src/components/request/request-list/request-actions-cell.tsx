import { FC } from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { CheckCircleOutline, HighlightOffOutlined } from "@mui/icons-material";

export const RequestActionsCell: FC<{
	onCheckClick: VoidFunction;
	onRollbackClick: VoidFunction;
	hideCheck?: boolean;
	hideRollback?: boolean;
	checkTooltip?: string;
	rollbackTooltip?: string;
}> = ({
	onCheckClick,
	onRollbackClick,
	hideCheck,
	hideRollback,
	checkTooltip,
	rollbackTooltip,
}) => {
	return (
		<Stack direction="row">
			{!hideCheck && (
				<Tooltip title={checkTooltip} hidden={!checkTooltip}>
					<IconButton onClick={() => onCheckClick()}>
						<CheckCircleOutline color="primary" />
					</IconButton>
				</Tooltip>
			)}
			{!hideRollback && (
				<Tooltip title={rollbackTooltip} hidden={!rollbackTooltip}>
					<IconButton onClick={() => onRollbackClick()}>
						<HighlightOffOutlined color="error" />
					</IconButton>
				</Tooltip>
			)}
		</Stack>
	);
};
