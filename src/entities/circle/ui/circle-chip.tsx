import { BntChip } from "@/shared/ui/chip/chip";

import styles from "./circle-chip.module.css";

type TCircleChipProps = {
	label: string;
};

export function CircleChip({ label }: TCircleChipProps) {
	return <BntChip className={styles.chip} title={label} label={label} clickable={false} />;
}
