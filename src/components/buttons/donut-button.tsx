import { FC } from "react";
import { Avatar, Typography } from "@mui/material";
import { BntTransparentButton } from "shared/buttons/transparent-button";
import { TDonut } from "@/types/model";

export const DonutButton: FC<{
	donut: Pick<TDonut, "logo" | "name">;
	onClick: () => void;
}> = ({ donut, onClick }) => {
	return (
		<BntTransparentButton
			onClick={onClick}
			disableRipple
			startIcon={<Avatar src={donut.logo?.thumb?.url || undefined} alt={`${donut.name} `} />}
		>
			<Typography variant="body2">{donut.name && <span>{donut.name}</span>}</Typography>
		</BntTransparentButton>
	);
};
