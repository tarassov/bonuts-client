import { FC } from "react";
import { IconButton } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useDonutUi } from "logic/ui/use-donut-ui";
import { BntStack } from "shared/stack/stack";

export const StoreActionCell: FC<{ donutId: number }> = ({ donutId }) => {
	const { showDonut } = useDonutUi({ id: donutId });
	return (
		<BntStack direction="row" justifyContent="center">
			<IconButton onClick={() => showDonut()}>
				<EditOutlined />
			</IconButton>
		</BntStack>
	);
};
