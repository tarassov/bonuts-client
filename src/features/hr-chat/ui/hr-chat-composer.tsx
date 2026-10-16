import type { FC, KeyboardEvent } from "react";
import { useState } from "react";
import { SendOutlined } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";

import { BntTypography } from "@/shared/ui/typography";

import hrChatTexts from "../config/hr-chat-texts";

import styles from "./hr-chat-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_s } from "@/services/localization/texts";

interface IHrChatComposerProps {
	/** Sending is blocked while this chat waits for a reply; typing stays possible. */
	isBlocked: boolean;
	isSending: boolean;
	onSend: (text: string) => Promise<boolean> | boolean;
	autoFocus?: boolean;
}

export const HrChatComposer: FC<IHrChatComposerProps> = ({ isBlocked, isSending, onSend, autoFocus }) => {
	const { t } = useBntTranslate();
	const [text, setText] = useState("");
	const canSend = !isBlocked && !isSending && text.trim().length > 0;

	const submit = async () => {
		if (!canSend) return;

		const sent = await onSend(text.trim());
		if (sent) setText("");
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;

		event.preventDefault();
		submit().catch(() => undefined);
	};

	return (
		<div className={styles.composer}>
			<TextField
				multiline
				fullWidth
				minRows={1}
				maxRows={6}
				size="small"
				autoFocus={autoFocus}
				value={text}
				placeholder={t(hrChatTexts.composer_placeholder, { capitalize: true })}
				helperText={isBlocked ? t(hrChatTexts.wait_for_reply, { capitalize: true }) : undefined}
				onChange={(event) => setText(event.target.value)}
				onKeyDown={handleKeyDown}
				slotProps={{
					input: {
						endAdornment: (
							<IconButton aria-label={t(texts_s.send, { capitalize: true })} color="primary" size="small" disabled={!canSend} onClick={() => submit().catch(() => undefined)}>
								<SendOutlined fontSize="small" />
							</IconButton>
						),
					},
				}}
			/>
			<BntTypography variant="caption" color="text.secondary">
				{t(hrChatTexts.privacy_notice_short, { capitalize: true })}
			</BntTypography>
		</div>
	);
};
