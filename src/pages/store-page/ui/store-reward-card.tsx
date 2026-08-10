import { EditOutlined, ImageOutlined } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_c, texts_d, texts_e, texts_h, texts_l, texts_o, texts_r, texts_s, texts_v } from "services/localization/texts";

import { BntButton } from "@/shared/ui/buttons";
import { BntSurface } from "@/shared/ui/surface";
import { UiSwitch } from "@/shared/ui/switch";
import { BntTypography } from "@/shared/ui/typography";

import styles from "./store-reward-card.module.scss";
import type { TDonut } from "@/types/model";

const getAvailabilityKey = (donut: TDonut) => {
	if (!donut.has_remains) return texts_s.stock_is_unlimited;
	if (!donut.on_stock) return texts_o.out_of_stock;

	return texts_l.left_in_stock;
};

export function StoreRewardCard({ donut, onEdit, onToggleActive }: { donut: TDonut; onEdit: (id: number) => void; onToggleActive?: (donut: TDonut) => void }) {
	const { t } = useBntTranslate();
	const imageUrl = donut.logo?.url || donut.logo?.thumb?.url || undefined;
	const availability = getAvailabilityKey(donut);
	const statusText = donut.expiration_date
		? `${t(texts_v.valid_until)} ${new Intl.DateTimeFormat().format(new Date(donut.expiration_date))}`
		: t(donut.active ? texts_v.visible_in_store : texts_h.hidden_from_store);

	return (
		<BntSurface className={styles.rewardCard} isInteractive>
			<div className={styles.imageArea}>
				<span className={styles.stockBadge} data-sold-out={donut.has_remains && !donut.on_stock}>
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
				<BntTypography as="h2" className={styles.rewardTitle}>
					{donut.name}
				</BntTypography>
				<BntTypography as="p" color="text.secondary" variant="caption">
					{statusText}
				</BntTypography>
			</div>
			<div className={styles.cardActions}>
				<label>
					<UiSwitch checked={donut.active} onChange={() => onToggleActive?.(donut)} size="small" />
					<span>{t(donut.active ? texts_a.active : texts_d.disabled_reward, { capitalize: true })}</span>
				</label>
				<BntButton color="inherit" onClick={() => onEdit(donut.id)} startIcon={<EditOutlined />} size="small" noTransform>
					{t(texts_e.edit, { capitalize: true })}
				</BntButton>
			</div>
		</BntSurface>
	);
}
