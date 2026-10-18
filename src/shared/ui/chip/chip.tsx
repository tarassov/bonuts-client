import { FC } from "react";
import { Chip, ChipProps } from "@mui/material";

export type BntChipProps = ChipProps;
export const BntChip: FC<BntChipProps> = (props) => {
	return <Chip {...props} />;
};
