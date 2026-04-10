import { MoreHoriz } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography/typography";

import { CircleChip } from "@/entities/circle";

import styles from "./modal-employee-view.module.css";
import type { TModalEmployeeViewMetaProps } from "./modal-employee-view.types";

export function ModalEmployeeViewMeta({ metaItems, circles, hiddenCircleNames }: TModalEmployeeViewMetaProps) {
	if (!metaItems.length && !circles.length) {
		return null;
	}

	return (
		<section className={styles.metaCard}>
			{metaItems.map((item) => {
				return (
					<BntStack key={item.label} className={styles.metaRow} direction="row" justifyContent="space-between">
						<BntTypography className={styles.metaLabel}>{item.label}</BntTypography>
						<BntTypography className={styles.metaValue}>{item.value}</BntTypography>
					</BntStack>
				);
			})}

			{circles.length > 0 && (
				<BntStack className={styles.circlesRow} direction="row" alignItems="center">
					{circles.map((circle) => {
						return <CircleChip key={`${circle.id}-${circle.name}`} label={circle.name || ""} />;
					})}
					{Boolean(hiddenCircleNames) && (
						<Tooltip title={hiddenCircleNames}>
							<MoreHoriz className={styles.moreIcon} />
						</Tooltip>
					)}
				</BntStack>
			)}
		</section>
	);
}
