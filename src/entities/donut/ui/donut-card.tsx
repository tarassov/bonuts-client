import type { ReactNode } from "react";
import { ImageOutlined } from "@mui/icons-material";

import { BntCardActionArea } from "@/shared/ui/card";
import { BntSurface } from "@/shared/ui/surface";
import { BntTypography } from "@/shared/ui/typography";

import styles from "./donut-card.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_l, texts_o, texts_r, texts_s } from "@/services/localization/texts";
import type { TDonut } from "@/types/model";

interface IDonutCardProps {
	donut: TDonut;
	footer?: ReactNode;
	onClick: VoidFunction;
}

const getAvailabilityKey = (donut: TDonut) => {
	if (!donut.use_remains) return texts_s.stock_is_unlimited;
	if (!donut.on_stock) return texts_o.out_of_stock;

	return texts_l.left_in_stock;
};

export function DonutCard({ donut, footer, onClick }: IDonutCardProps) {
	const { t } = useBntTranslate();
	const imageUrl = donut.logo?.url || donut.logo?.thumb?.url;
	const availability = getAvailabilityKey(donut);
	const isSoldOut = donut.use_remains && !donut.on_stock;

	return (
		<BntSurface className={styles.card} data-testid="donut-card" isInteractive>
			<BntCardActionArea aria-label={donut.name} className={styles.actionArea} onClick={onClick}>
				<div className={styles.imageArea}>
					<span className={styles.stockBadge} data-sold-out={isSoldOut}>
						{t(availability)} {availability === texts_l.left_in_stock ? donut.on_stock : null}
					</span>
					<span className={styles.priceBadge}>
						{donut.price} {t(texts_c.coin, { count: donut.price })}
					</span>
					{imageUrl ? (
						<img alt={donut.name} src={imageUrl} />
					) : (
						<div className={styles.imagePlaceholder}>
							<ImageOutlined />
							<span>{t(texts_r.reward_image)}</span>
						</div>
					)}
				</div>
				<div className={styles.cardBody}>
					<BntTypography as="h2" className={styles.title}>
						{donut.name}
					</BntTypography>
					{donut.description ? (
						<BntTypography as="p" className={styles.description} color="text.secondary" variant="caption">
							{donut.description}
						</BntTypography>
					) : null}
				</div>
			</BntCardActionArea>
			{footer ? <div className={styles.cardFooter}>{footer}</div> : null}
		</BntSurface>
	);
}
