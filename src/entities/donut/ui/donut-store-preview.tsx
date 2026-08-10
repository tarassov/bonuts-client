import { ImageOutlined } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c, texts_r } from "services/localization/texts";

import { BntTypography } from "@/shared/ui/typography";

import styles from "./donut-store-preview.module.scss";
import type { TDonut } from "@/types/model";

export function DonutStorePreview({ donut }: { donut: TDonut }) {
	const { t } = useBntTranslate();
	const imageUrl = donut.logo?.url || donut.logo?.thumb?.url;

	return (
		<article className={styles.preview}>
			<div className={styles.image}>{imageUrl ? <img alt="" src={imageUrl} /> : <ImageOutlined />}</div>
			<div className={styles.content}>
				<BntTypography as="h3" className={styles.title}>
					{donut.name}
				</BntTypography>
				<BntTypography className={styles.price}>
					{donut.price} {t(texts_c.coin, { count: donut.price })}
				</BntTypography>
				{donut.has_remains ? <span className={styles.stock}>{donut.on_stock}</span> : null}
			</div>
			<span className={styles.srOnly}>{t(texts_r.reward_image)}</span>
		</article>
	);
}
