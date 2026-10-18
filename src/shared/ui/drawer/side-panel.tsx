import type { FC, ReactNode } from "react";
import { CloseOutlined } from "@mui/icons-material";
import type { DrawerProps } from "@mui/material";

import { BntIconButton } from "@/shared/ui/icon-button";
import { BntTypography } from "@/shared/ui/typography";

import { SidePanelBody, SidePanelDrawer, SidePanelHeader } from "./side-panel.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c } from "@/services/localization/texts";

const DEFAULT_SIDE_PANEL_WIDTH = 480;

export interface IBntSidePanelProps {
	isOpen: boolean;
	onClose: () => void;
	title: ReactNode;
	children: ReactNode;
	/** Panel width from the md breakpoint up; on phones the panel always takes the full width. */
	width?: number;
	anchor?: DrawerProps["anchor"];
}

/** Temporary side panel with a title bar and a close button; the body is a flex column so content can scroll on its own. */
export const BntSidePanel: FC<IBntSidePanelProps> = ({ isOpen, onClose, title, children, width = DEFAULT_SIDE_PANEL_WIDTH, anchor = "right" }) => {
	const { t } = useBntTranslate();
	const closeLabel = t(texts_c.close, { capitalize: true });

	return (
		<SidePanelDrawer anchor={anchor} open={isOpen} onClose={onClose} panelWidth={width}>
			<SidePanelHeader>
				<BntTypography variant="subtitle1" fontWeight={600} noWrap>
					{title}
				</BntTypography>
				<BntIconButton aria-label={closeLabel} onClick={onClose}>
					<CloseOutlined />
				</BntIconButton>
			</SidePanelHeader>
			<SidePanelBody>{children}</SidePanelBody>
		</SidePanelDrawer>
	);
};
