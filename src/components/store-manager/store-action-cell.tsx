import { FC } from "react";
import { EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { BntStack } from "shared/ui/stack";

import { useDonutUi } from "logic/ui/use-donut-ui";

export const StoreActionCell: FC<{ donutId: number }> = ({ donutId }) => {
	const { editDonut } = useDonutUi({ id: donutId });
	return (
		<BntStack direction="row" justifyContent="center">
			<IconButton onClick={() => editDonut()}>
				<EditOutlined />
			</IconButton>
		</BntStack>
	);
};
