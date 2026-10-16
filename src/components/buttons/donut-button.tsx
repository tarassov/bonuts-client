import type { FC } from "react";
import { Avatar, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { BntTransparentButton } from "@/shared/ui/buttons";

import { TDonut } from "@/types/model";

export const DonutButton: FC<{
	buttonSx?: SxProps<Theme>;
	donut: Pick<TDonut, "logo" | "name">;
	onClick: () => void;
}> = ({ buttonSx, donut, onClick }) => {
	return (
		<BntTransparentButton onClick={onClick} disableRipple startIcon={<Avatar src={donut.logo?.thumb?.url || undefined} alt={`${donut.name} `} />} sx={buttonSx}>
			<Typography variant="body2">{donut.name && <span>{donut.name}</span>}</Typography>
		</BntTransparentButton>
	);
};
