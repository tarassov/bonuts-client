import { ReactNode } from "react";
import { Badge } from "@mui/material";
import { BadgeProps } from "@mui/material/Badge";

type OnlineBadgeProps = {
	children: ReactNode;
	online?: boolean;
	overlap?: BadgeProps["overlap"];
};

export function OnlineBadge({ children, online = false, overlap = "circular" }: OnlineBadgeProps) {
	return (
		<Badge
			overlap={overlap}
			variant="dot"
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			invisible={!online}
			badgeContent=" "
			sx={(theme) => ({
				"& .MuiBadge-badge": {
					width: 10,
					minWidth: 10,
					height: 10,
					minHeight: 10,
					borderRadius: "50%",
					backgroundColor: theme.palette.success.main,
					border: `2px solid ${theme.palette.background.paper}`,
				},
			})}
		>
			{children}
		</Badge>
	);
}
