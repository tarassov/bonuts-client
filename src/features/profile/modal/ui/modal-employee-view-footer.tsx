import { BntButton } from "@/shared/ui/buttons/bnt-button";
import { BntStack } from "@/shared/ui/stack";

import styles from "./modal-employee-view.module.css";
import type { TModalEmployeeViewFooterProps } from "./modal-employee-view.types";

export function ModalEmployeeViewFooter({ goToLabel, onGoToEmployeeClick }: TModalEmployeeViewFooterProps) {
	return (
		<footer>
			<BntStack className={styles.footer} direction="row" justifyContent="flex-end">
				<BntButton className={styles.goToButton} noTransform variant="contained" onClick={onGoToEmployeeClick}>
					{goToLabel}
				</BntButton>
			</BntStack>
		</footer>
	);
}
