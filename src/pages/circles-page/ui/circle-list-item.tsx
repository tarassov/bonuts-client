import { WorkspacesOutlined } from "@mui/icons-material";

import { BntTypography } from "@/shared/ui/typography";

import { CircleActionsMenu } from "./circle-actions-menu";
import styles from "./circles-page.module.scss";
import type { TCircle } from "@/types/model";

interface ICircleListItemProps {
	circle: TCircle;
	onDelete: (id: number) => void;
	onEdit: (id: number) => void;
}

export function CircleListItem({ circle, onDelete, onEdit }: ICircleListItemProps) {
	if (!circle.id) return null;

	return (
		<li className={styles.circleItem} data-testid="circle-list-item">
			<span className={styles.circleIcon} aria-hidden="true">
				<WorkspacesOutlined />
			</span>
			<BntTypography className={styles.circleName}>{circle.name}</BntTypography>
			<CircleActionsMenu circleId={circle.id} onDelete={onDelete} onEdit={onEdit} />
		</li>
	);
}
