import { BntButton } from "@/shared/ui/buttons";
import { BntStack } from "@/shared/ui/stack";

import styles from "./modal-employee-view.module.css";
import type { TModalEmployeeViewFooterProps } from "./modal-employee-view.types";

export function ModalEmployeeViewFooter({ goToLabel, transferLabel, onGoToEmployeeClick, onTransferClick }: TModalEmployeeViewFooterProps) {
	return (
		<footer>
			<BntStack className={styles.footerActions} direction={{ xs: "column", sm: "row" }} spacing={1.5}>
				{transferLabel && onTransferClick ? (
					<BntButton className={styles.transferButton} noTransform variant="contained" onClick={onTransferClick}>
						{transferLabel}
					</BntButton>
				) : null}
				<BntButton className={styles.goToButton} noTransform variant="outlined" onClick={onGoToEmployeeClick}>
					{goToLabel}
				</BntButton>
			</BntStack>
		</footer>
	);
}
