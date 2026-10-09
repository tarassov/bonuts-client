import type { ReactNode } from "react";
import { Inventory2Outlined, LayersOutlined, RemoveShoppingCartOutlined, StorefrontOutlined } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_i, texts_o, texts_s, texts_t } from "services/localization/texts";

import { BntSurface } from "@/shared/ui/surface";
import { BntTypography } from "@/shared/ui/typography";

import type { IStoreStatistics } from "../model/store-page.types";

import styles from "./store-statistics.module.scss";

interface IStatisticItemProps {
	icon: ReactNode;
	label: string;
	tone: "default" | "primary" | "warning";
	value: number;
}

function StatisticItem({ icon, label, tone, value }: IStatisticItemProps) {
	return (
		<BntSurface className={styles.statisticItem}>
			<div className={styles.statisticIcon} data-tone={tone}>
				{icon}
			</div>
			<div>
				<BntTypography color="text.secondary" variant="caption">
					{label}
				</BntTypography>
				<BntTypography className={styles.statisticValue}>{value}</BntTypography>
			</div>
		</BntSurface>
	);
}

export function StoreStatistics({ statistics, total }: { statistics: IStoreStatistics; total: number }) {
	const { t } = useBntTranslate();

	return (
		<section className={styles.statistics} aria-label={t(texts_s.store_statistics)}>
			<StatisticItem icon={<LayersOutlined />} label={t(texts_t.total_rewards)} tone="default" value={total} />
			<StatisticItem icon={<StorefrontOutlined />} label={t(texts_i.in_storefront)} tone="primary" value={statistics.activeCount} />
			<StatisticItem icon={<RemoveShoppingCartOutlined />} label={t(texts_o.out_of_stock)} tone="warning" value={statistics.soldOutCount} />
			<StatisticItem icon={<Inventory2Outlined />} label={t(texts_s.stock_is_unlimited)} tone="default" value={statistics.unlimitedCount} />
		</section>
	);
}
