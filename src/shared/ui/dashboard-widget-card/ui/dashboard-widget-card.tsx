import type { ReactNode } from "react";
import { Box, styled } from "@mui/material";

import { BntCard } from "@/shared/ui/card/card";

import type { IDashboardWidgetSizingProps } from "../model/types";

interface IDashboardWidgetCardProps extends IDashboardWidgetSizingProps {
	children: ReactNode;
}

const WidgetContainer = styled(Box, {
	shouldForwardProp: (prop) => prop !== "columns",
})<Required<Pick<IDashboardWidgetSizingProps, "columns">>>(({ columns, theme }) => ({
	[theme.breakpoints.up("lg")]: {
		gridColumn: columns === 2 ? "span 2" : "span 1",
	},
}));

const SidebarCard = styled(BntCard)(({ theme }) => ({
	padding: theme.spacing(2),
	borderRadius: theme.spacing(2),
	height: "100%",
}));

export function DashboardWidgetCard({ children, columns = 1 }: IDashboardWidgetCardProps) {
	return (
		<WidgetContainer columns={columns}>
			<SidebarCard>{children}</SidebarCard>
		</WidgetContainer>
	);
}
