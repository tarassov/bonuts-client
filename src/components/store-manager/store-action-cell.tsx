import { FC } from "react";
import { IconButton } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useDonutUi } from "logic/ui/use-donut-ui";

export const StoreActionCell: FC<{ donutId: number }> = ({ donutId }) => {
	const { showDonut } = useDonutUi({ id: donutId });
	return (
		<IconButton onClick={() => showDonut()}>
			<EditOutlined />
		</IconButton>
	);
};
