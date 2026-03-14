import { ReactNode } from "react";
import { Box } from "@mui/material";

import { BntBadge } from "./bnt-badge";

type OnlineBadgeProps = {
	children: ReactNode;
	online?: boolean;
};

export function OnlineBadge({ children, online = false }: OnlineBadgeProps) {
	return (
		<BntBadge
			overlap="circular"
			variant="dot"
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			invisible={!online}
			sx={(theme) => ({
				"& .MuiBadge-badge": {
					right: 1,
					top: "auto",
					bottom: 1,
					width: 10,
					height: 10,
					minWidth: 10,
					borderRadius: "50%",
					backgroundColor: theme.palette.success.main,
					border: `2px solid ${theme.palette.background.paper}`,
				},
			})}
		>
			<Box sx={{ display: "inline-flex" }}>{children}</Box>
		</BntBadge>
	);
}
