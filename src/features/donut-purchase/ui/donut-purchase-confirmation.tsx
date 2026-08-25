import { CheckRounded } from "@mui/icons-material";

import styles from "./donut-purchase-confirmation.module.scss";

export function DonutPurchaseConfirmation() {
	return (
		<div aria-hidden className={styles.confirmation} data-testid="donut-purchase-confirmation">
			<span className={styles.icon}>
				<CheckRounded />
			</span>
		</div>
	);
}
