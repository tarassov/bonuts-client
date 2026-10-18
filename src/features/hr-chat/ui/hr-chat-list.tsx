import type { FC } from "react";
import { AddOutlined, DeleteOutline } from "@mui/icons-material";
import { CircularProgress, List, ListItemButton, ListItemText } from "@mui/material";

import { useFormattedDate } from "@/shared/lib/date";
import { BntRegularButton } from "@/shared/ui/buttons";
import { BntIconButton } from "@/shared/ui/icon-button";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import hrChatTexts from "../config/hr-chat-texts";
import type { THrChatListItem } from "../model/hr-chat.types";

import styles from "./hr-chat-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

interface IHrChatListProps {
	chats: THrChatListItem[];
	selectedChatId: number | null;
	isNewChatDisabled: boolean;
	onSelect: (id: number) => void;
	onNewChat: () => void;
	onDelete: (id: number) => void;
}

export const HrChatList: FC<IHrChatListProps> = ({ chats, selectedChatId, isNewChatDisabled, onSelect, onNewChat, onDelete }) => {
	const { t } = useBntTranslate();
	const { getFormattedDate } = useFormattedDate();

	return (
		<div className={styles.chatList}>
			<div className={styles.chatListHeader}>
				<BntRegularButton noTransform fullWidth size="small" startIcon={<AddOutlined />} disabled={isNewChatDisabled} onClick={onNewChat}>
					{t(hrChatTexts.new_chat, { capitalize: true })}
				</BntRegularButton>
			</div>
			<div className={styles.chatListItems}>
				{chats.length === 0 ? (
					<BntTypography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: "center" }}>
						{t(hrChatTexts.no_chats_yet, { capitalize: true })}
					</BntTypography>
				) : (
					<List dense disablePadding>
						{chats.map((chat) => (
							<ListItemButton key={chat.id} selected={chat.id === selectedChatId} onClick={() => onSelect(chat.id)} sx={{ alignItems: "flex-start", gap: 0.5 }}>
								<ListItemText
									primary={chat.title}
									secondary={getFormattedDate(chat.last_message_at, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
									primaryTypographyProps={{ variant: "body2", noWrap: true }}
									secondaryTypographyProps={{ variant: "caption" }}
								/>
								<BntStack direction="row" alignItems="center" gap={0.5} sx={{ mt: 0.5 }}>
									{chat.has_pending ? <CircularProgress size={14} /> : null}
									<BntIconButton
										size="small"
										aria-label={t(hrChatTexts.delete_chat, { capitalize: true })}
										onClick={(event) => {
											event.stopPropagation();
											onDelete(chat.id);
										}}
									>
										<DeleteOutline fontSize="small" />
									</BntIconButton>
								</BntStack>
							</ListItemButton>
						))}
					</List>
				)}
			</div>
		</div>
	);
};
