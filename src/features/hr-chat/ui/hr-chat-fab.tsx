import type { FC } from "react";
import { useState } from "react";
import { AutoAwesomeOutlined } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BntSidePanel } from "@/shared/ui/drawer";

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

const CHAT_PANEL_WIDTH = 760;

export const HrChatFab: FC = () => {
	const { t } = useBntTranslate();
	const { isAvailable } = useHrChatAccess();
	const isChatOnPage = useIsInlineHrChatMounted();
	const [isOpen, setIsOpen] = useState(false);

	if (!isAvailable || isChatOnPage) return null;

	const openLabel = t(hrChatTexts.open_ai_chat, { capitalize: true });

	return (
		<>
			<Tooltip title={openLabel} placement="left">
				<AiFab color="primary" aria-label={openLabel} onClick={() => setIsOpen(true)}>
					<AutoAwesomeOutlined />
				</AiFab>
			</Tooltip>
			<BntSidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} title={t(hrChatTexts.ai_chat, { capitalize: true })} width={CHAT_PANEL_WIDTH}>
				{isOpen ? <HrChatPage variant="drawer" /> : null}
			</BntSidePanel>
		</>
	);
};
