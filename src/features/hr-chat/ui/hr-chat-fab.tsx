import type { FC } from "react";
import { useState } from "react";
import { AutoAwesomeOutlined, CloseOutlined } from "@mui/icons-material";
import { Drawer, Fab, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BntIconButton } from "@/shared/ui/icon-button";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import hrChatTexts from "../config/hr-chat-texts";
import { useHrChatAccess } from "../model/hr-chat-access";
import { useIsInlineHrChatMounted } from "../model/hr-chat-presence";

import { HrChatPage } from "./hr-chat-page";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

/** Floating entry point to the analyst; sits above sticky form bars and respects the phone's safe area. */
const AiFab = styled(Fab)(({ theme }) => ({
	position: "fixed",
	right: `calc(${theme.spacing(2)} + env(safe-area-inset-right, 0px))`,
	bottom: `calc(${theme.spacing(2)} + env(safe-area-inset-bottom, 0px))`,
	zIndex: theme.zIndex.speedDial,
}));

const DRAWER_WIDTH = 760;

export const HrChatFab: FC = () => {
	const { t } = useBntTranslate();
	const { isAvailable } = useHrChatAccess();
	const isChatOnPage = useIsInlineHrChatMounted();
	const [isOpen, setIsOpen] = useState(false);

	if (!isAvailable || isChatOnPage) return null;

	const title = t(hrChatTexts.ai_chat, { capitalize: true });

	return (
		<>
			<Tooltip title={t(hrChatTexts.open_ai_chat, { capitalize: true })} placement="left">
				<AiFab color="primary" aria-label={t(hrChatTexts.open_ai_chat, { capitalize: true })} onClick={() => setIsOpen(true)}>
					<AutoAwesomeOutlined />
				</AiFab>
			</Tooltip>
			<Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)} slotProps={{ paper: { sx: { width: { xs: "100%", md: DRAWER_WIDTH }, maxWidth: "100%" } } }}>
				<BntStack direction="column" sx={{ height: "100%", minHeight: 0 }}>
					<BntStack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1, borderBottom: 1, borderColor: "divider" }}>
						<BntTypography variant="subtitle1" fontWeight={600}>
							{title}
						</BntTypography>
						<BntIconButton aria-label={t(hrChatTexts.ai_chat, { capitalize: true })} onClick={() => setIsOpen(false)}>
							<CloseOutlined />
						</BntIconButton>
					</BntStack>
					<BntStack direction="column" sx={{ flex: "1 1 auto", minHeight: 0 }}>
						{isOpen ? <HrChatPage variant="drawer" /> : null}
					</BntStack>
				</BntStack>
			</Drawer>
		</>
	);
};
