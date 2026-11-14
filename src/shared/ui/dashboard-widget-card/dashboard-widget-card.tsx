import { type ReactNode, useId, useState } from "react";
import { Collapse, useMediaQuery, useTheme } from "@mui/material";

import { BntTypography } from "@/shared/ui/typography";

import {
	ExpandIcon,
	MobileHeader,
	MobileHeaderAction,
	MobileWidgetHeader,
	SidebarCard,
	WidgetActionArea,
	WidgetContainer,
	WidgetContent,
	WidgetFooter,
	WidgetHeader,
} from "./dashboard-widget-card.styles";
import type { IDashboardWidgetSizingProps } from "./types";

interface IDashboardWidgetCardProps extends IDashboardWidgetSizingProps {
	ariaLabel?: string;
	children: ReactNode;
	headerAction?: ReactNode;
	footer?: ReactNode;
	onClick?: () => void;
	title: string;
}

export function DashboardWidgetCard({ ariaLabel, children, columns = 1, footer, headerAction, onClick, title }: IDashboardWidgetCardProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [isExpanded, setIsExpanded] = useState(false);
	const contentId = useId();
	const content = (
		<WidgetContent>
			{!isMobile ? (
				<WidgetHeader>
					<BntTypography variant="subtitle2" fontWeight={700}>
						{title}
					</BntTypography>
					{headerAction}
				</WidgetHeader>
			) : null}
			{children}
		</WidgetContent>
	);
	const interactiveContent = onClick ? (
		<WidgetActionArea aria-label={ariaLabel} onClick={onClick}>
			{content}
		</WidgetActionArea>
	) : (
		content
	);

	return (
		<WidgetContainer columns={columns}>
			<SidebarCard>
				{isMobile ? (
					<>
						<MobileHeader>
							<MobileWidgetHeader aria-controls={contentId} aria-expanded={isExpanded} onClick={() => setIsExpanded((expanded) => !expanded)}>
								<BntTypography variant="subtitle2" fontWeight={700}>
									{title}
								</BntTypography>
								<ExpandIcon isExpanded={isExpanded} />
							</MobileWidgetHeader>
							{headerAction ? <MobileHeaderAction>{headerAction}</MobileHeaderAction> : null}
						</MobileHeader>
						<Collapse id={contentId} in={isExpanded} timeout="auto" unmountOnExit>
							{interactiveContent}
							{footer ? <WidgetFooter>{footer}</WidgetFooter> : null}
						</Collapse>
					</>
				) : (
					<>
						{interactiveContent}
						{footer ? <WidgetFooter>{footer}</WidgetFooter> : null}
					</>
				)}
			</SidebarCard>
		</WidgetContainer>
	);
}
