import { ActionType } from "shared/ui/react-table/types";
import {
	AddOutlined,
	CheckCircleOutline,
	DeleteOutlined,
	DonutSmallOutlined,
	EditOutlined,
	HighlightOffOutlined,
} from "@mui/icons-material";

export const actionIconFactory = (actionType?: ActionType) => {
	switch (actionType) {
		case ActionType.Accept:
			return <CheckCircleOutline color="primary" />;
		case ActionType.Decline:
			return <HighlightOffOutlined color="error" />;
		case ActionType.Create:
			return <AddOutlined color="primary" />;
		case ActionType.Delete:
			return <DeleteOutlined />;
		case ActionType.Edit:
			return <EditOutlined />;
		default:
			return <DonutSmallOutlined />;
	}
};
