import type { AnimationEvent } from "react";
import { CheckRounded } from "@mui/icons-material";

import styles from "./donut-purchase-confirmation.module.scss";

interface IDonutPurchaseConfirmationProps {
	onComplete: VoidFunction;
}

export function DonutPurchaseConfirmation({ onComplete }: IDonutPurchaseConfirmationProps) {
	const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) onComplete();
	};

	return (
		<div aria-hidden className={styles.confirmation} data-testid="donut-purchase-confirmation" onAnimationEnd={handleAnimationEnd}>
			<span className={styles.icon}>
				<CheckRounded />
			</span>
		</div>
	);
}
