import type { FC } from "react";
import { useCallback, useState } from "react";
import { AddOutlined } from "@mui/icons-material";
import { MenuItem, Select } from "@mui/material";

import { useModal } from "@/shared/lib/modal";
import { BntIconButton } from "@/shared/ui/icon-button";
import { BntTypography } from "@/shared/ui/typography";

import hrChatTexts from "../config/hr-chat-texts";
import { useRegisterInlineHrChat } from "../model/hr-chat-presence";
import { useHrChat } from "../model/use-hr-chat";
import { useHrChatList } from "../model/use-hr-chat-list";
import { useNow } from "../model/use-now";

import { HrChatComposer } from "./hr-chat-composer";
import { HrChatList } from "./hr-chat-list";
import styles from "./hr-chat-page.module.scss";
import { HrChatThread } from "./hr-chat-thread";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

/** Elapsed-time labels and the stale check are refreshed this often. */
const CLOCK_INTERVAL_MS = 15_000;

/** `null` = nothing chosen yet (the latest chat opens), `"new"` = the admin starts a fresh dialog. */
type TSelection = number | "new" | null;

interface IHrChatPageProps {
	/** `page` is the reports tab; `drawer` is the copy opened from the floating button. */
	variant?: "page" | "drawer";
}

export const HrChatPage: FC<IHrChatPageProps> = ({ variant = "page" }) => {
	const { t } = useBntTranslate();
	useRegisterInlineHrChat(variant === "page");
	const { ConfirmationModal } = useModal();
	const [selection, setSelection] = useState<TSelection>(null);
	const list = useHrChatList();
	const activeChatId = selection === "new" ? null : (selection ?? list.chats[0]?.id ?? null);
	const chat = useHrChat(activeChatId);
	const { send } = chat;
	const { create } = list;
	const now = useNow(CLOCK_INTERVAL_MS);
	const isComposerBlocked = activeChatId !== null && chat.hasPending;
	const isSending = chat.isSending || list.isCreating;

	const handleSend = useCallback(
		async (text: string): Promise<boolean> => {
			if (activeChatId !== null) return send(text);

			const created = await create(text);
			if (created) setSelection(created.id);
			return Boolean(created);
		},
		[activeChatId, send, create]
	);

	const handleDelete = (id: number) => {
		ConfirmationModal.show({
			title: t(hrChatTexts.delete_chat, { capitalize: true }),
			text: t(hrChatTexts.delete_chat_confirm, { capitalize: true }),
			onSubmit: async () => {
				const removed = await list.remove(id);
				if (removed && activeChatId === id) setSelection("new");
			},
		});
	};

	if (list.isUnavailable) {
		return (
			<div className={styles.threadState}>
				<BntTypography variant="body2" color="text.secondary">
					{t(hrChatTexts.ai_chat_unavailable, { capitalize: true })}
				</BntTypography>
			</div>
		);
	}

	return (
		<div className={styles.root}>
			<aside className={styles.sidebar}>
				<HrChatList chats={list.chats} selectedChatId={activeChatId} isNewChatDisabled={selection === "new"} onSelect={setSelection} onNewChat={() => setSelection("new")} onDelete={handleDelete} />
			</aside>

			<div className={styles.main}>
				<div className={styles.mobileBar}>
					<Select<number | "">
						size="small"
						className={styles.mobileSelect}
						displayEmpty
						value={activeChatId ?? ""}
						onChange={(event) => setSelection(Number(event.target.value))}
						renderValue={(value) => (value === "" ? t(hrChatTexts.new_chat, { capitalize: true }) : (list.chats.find((item) => item.id === value)?.title ?? ""))}
					>
						{list.chats.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.title}
							</MenuItem>
						))}
					</Select>
					<BntIconButton aria-label={t(hrChatTexts.new_chat, { capitalize: true })} disabled={selection === "new"} onClick={() => setSelection("new")}>
						<AddOutlined />
					</BntIconButton>
				</div>

				<HrChatThread
					messages={activeChatId === null ? [] : chat.messages}
					now={now}
					isLoading={activeChatId !== null && chat.isLoading}
					isRetryDisabled={isComposerBlocked || isSending}
					onRetry={handleSend}
				/>
				<HrChatComposer isBlocked={isComposerBlocked} isSending={isSending} onSend={handleSend} />
			</div>
		</div>
	);
};
