import type { FC } from "react";
import { ContentCopyOutlined } from "@mui/icons-material";
import { DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";

import { copyText } from "@/shared/lib/clipboard";
import { BntButton } from "@/shared/ui/buttons";
import { BntDialog } from "@/shared/ui/dialog";
import { BntIconButton } from "@/shared/ui/icon-button";
import { useNotification } from "@/shared/ui/notification";
import { BntTypography } from "@/shared/ui/typography";

import { blackBoxTexts } from "@/entities/black-box";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TQuestionLinkDialogProps = {
	link: string;
	onClose: () => void;
};

/** The one and only time the author sees the status link of their question. */
export const QuestionLinkDialog: FC<TQuestionLinkDialogProps> = ({ link, onClose }) => {
	const { t } = useBntTranslate();
	const { showNotification } = useNotification();

	const handleCopy = async () => {
		await copyText(link);
		showNotification(blackBoxTexts.link_copied);
	};

	return (
		<BntDialog open handleClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>{t(blackBoxTexts.link_dialog_title)}</DialogTitle>
			<DialogContent>
				<BntTypography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
					{t(blackBoxTexts.link_dialog_text)}
				</BntTypography>
				<TextField
					fullWidth
					value={link}
					onFocus={(event) => event.target.select()}
					slotProps={{
						input: {
							readOnly: true,
							endAdornment: (
								<InputAdornment position="end">
									<BntIconButton aria-label={t(blackBoxTexts.copy_link)} onClick={handleCopy}>
										<ContentCopyOutlined />
									</BntIconButton>
								</InputAdornment>
							),
						},
					}}
				/>
			</DialogContent>
			<DialogActions>
				<BntButton variant="outlined" noTransform onClick={handleCopy}>
					{t(blackBoxTexts.copy_link)}
				</BntButton>
				<BntButton variant="contained" noTransform onClick={onClose}>
					{t(blackBoxTexts.i_saved_the_link)}
				</BntButton>
			</DialogActions>
		</BntDialog>
	);
};
