import { Chip, ChipProps } from "@mui/material";
import { FC } from "react";

export type BntChipProps = ChipProps;
export const BntChip: FC<BntChipProps> = (props) => {
	return <Chip {...props} />;
};
