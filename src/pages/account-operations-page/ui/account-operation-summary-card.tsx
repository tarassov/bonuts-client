import type { ReactNode } from "react";

import { BntTypography } from "@/shared/ui/typography";

import styles from "./account-operations-page.module.scss";

interface IAccountOperationSummaryCardProps {
	caption: string;
	icon: ReactNode;
	label: string;
	tone: "orange" | "green" | "purple";
	value: string;
}

export function AccountOperationSummaryCard({ caption, icon, label, tone, value }: IAccountOperationSummaryCardProps) {
	return (
		<article className={styles.summaryCard} data-tone={tone}>
			<div className={styles.summaryLabel}>
				{icon}
				<BntTypography as="h2" variant="body2">
					{label}
				</BntTypography>
			</div>
			<BntTypography as="p" className={styles.summaryValue}>
				{value}
			</BntTypography>
			<BntTypography as="p" color="text.secondary" variant="caption">
				{caption}
			</BntTypography>
		</article>
	);
}
