import type { ReactNode } from "react";
import { Box, styled } from "@mui/material";

import { BntCard, BntCardActionArea } from "@/shared/ui/card";

import type { IDashboardWidgetSizingProps } from "./types";

interface IDashboardWidgetCardProps extends IDashboardWidgetSizingProps {
	ariaLabel?: string;
	children: ReactNode;
	onClick?: () => void;
}

const WidgetContainer = styled(Box, {
	shouldForwardProp: (prop) => prop !== "columns",
})<Required<Pick<IDashboardWidgetSizingProps, "columns">>>(({ columns, theme }) => ({
	[theme.breakpoints.up("lg")]: {
		gridColumn: columns === 2 ? "span 2" : "span 1",
	},
}));

const SidebarCard = styled(BntCard)(({ theme }) => ({
	borderRadius: theme.spacing(2),
	height: "100%",
	overflow: "hidden",
}));

const WidgetContent = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
	height: "100%",
}));

const WidgetActionArea = styled(BntCardActionArea)({
	alignItems: "stretch",
	height: "100%",
	textAlign: "left",
});

export function DashboardWidgetCard({ ariaLabel, children, columns = 1, onClick }: IDashboardWidgetCardProps) {
	const content = <WidgetContent>{children}</WidgetContent>;

	return (
		<WidgetContainer columns={columns}>
			<SidebarCard>
				{onClick ? (
					<WidgetActionArea aria-label={ariaLabel} onClick={() => onClick()}>
						{content}
					</WidgetActionArea>
				) : (
					content
				)}
			</SidebarCard>
		</WidgetContainer>
	);
}
