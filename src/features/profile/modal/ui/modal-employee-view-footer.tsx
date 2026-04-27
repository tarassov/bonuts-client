import { BntButton } from "@/shared/ui/buttons";
import { BntStack } from "@/shared/ui/stack";

import styles from "./modal-employee-view.module.css";
import type { TModalEmployeeViewFooterProps } from "./modal-employee-view.types";

export function ModalEmployeeViewFooter({ children, goToLabel, onGoToEmployeeClick }: TModalEmployeeViewFooterProps) {
	return (
		<footer>
			<BntStack className={styles.footer} direction={{ xs: "column", sm: "row" }} justifyContent={{ xs: "stretch", sm: "space-between" }} alignItems={{ xs: "stretch", sm: "flex-end" }}>
				<BntStack className={styles.footerBadges} direction="row" alignItems="center" flexWrap="wrap" spacing={1}>
					{children}
				</BntStack>
				<BntButton className={styles.goToButton} noTransform variant="contained" onClick={onGoToEmployeeClick}>
					{goToLabel}
				</BntButton>
			</BntStack>
		</footer>
	);
}
