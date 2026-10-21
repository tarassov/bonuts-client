import { styled } from "@mui/material/styles";

import { BntCard } from "@/shared/ui/card";

export const PickerCard = styled(BntCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(2),
	padding: theme.spacing(3),
	borderRadius: 16,
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(2),
	},
}));

export const PickerFooter = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexWrap: "wrap",
	gap: theme.spacing(1.5),
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column-reverse",
		alignItems: "stretch",
	},
}));
