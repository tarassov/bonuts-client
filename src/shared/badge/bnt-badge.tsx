import { styled } from "@mui/material/styles";
import { Badge, BadgeProps } from "@mui/material";

export const BntBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	"& .MuiBadge-badge": {
		right: -3,
		top: 5,
		fontSize: "8pt",
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0",
	},
}));
