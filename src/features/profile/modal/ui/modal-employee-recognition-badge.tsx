import { EmojiEventsOutlined } from "@mui/icons-material";

import { BntTypography } from "@/shared/ui/typography";

import styles from "./modal-employee-view.module.css";

type TModalEmployeeRecognitionBadgeProps = {
	title?: string;
};

export function ModalEmployeeRecognitionBadge({ title }: TModalEmployeeRecognitionBadgeProps) {
	if (!title) {
		return null;
	}

	return (
		<div className={styles.recognitionBadge}>
			<EmojiEventsOutlined className={styles.recognitionBadgeIcon} />
			<BntTypography className={styles.recognitionBadgeTitle}>{title}</BntTypography>
		</div>
	);
}
