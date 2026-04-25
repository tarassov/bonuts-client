import { CloseOutlined } from "@mui/icons-material";

import { BntIconButton } from "@/shared/ui/icon-button";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import styles from "./modal-employee-view.module.css";
import type { TModalEmployeeViewHeaderProps } from "./modal-employee-view.types";
import { DEFAULT_AVATAR } from "@/constants/images";

export function ModalEmployeeViewHeader({ avatarUrl, name, position, profileFallback, onClose }: TModalEmployeeViewHeaderProps) {
	return (
		<header className={styles.header}>
			<BntStack className={styles.headerRow} direction="row" justifyContent="space-between" alignItems="center">
				<BntStack className={styles.identityRow} direction="row" alignItems="center">
					<img className={styles.avatar} src={avatarUrl || DEFAULT_AVATAR} alt={name || profileFallback} />
					<BntStack className={styles.identityText}>
						<BntTypography className={styles.name}>{name}</BntTypography>
						<BntTypography className={styles.position}>{position}</BntTypography>
					</BntStack>
				</BntStack>
				<BntIconButton className={styles.closeButton} onClick={onClose}>
					<CloseOutlined />
				</BntIconButton>
			</BntStack>
		</header>
	);
}
