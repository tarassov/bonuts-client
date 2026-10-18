import { DonutSmallOutlined, ShoppingBagOutlined, UndoRounded } from "@mui/icons-material";

import { BntCarousel } from "@/shared/ui/carousel";

import type { IAccountOperationsSummary } from "../model/account-operations-types";

import { AccountOperationSummaryCard } from "./account-operation-summary-card";
import styles from "./account-operations-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_d, texts_n, texts_p, texts_r, texts_s } from "@/services/localization/texts";

export function AccountOperationsSummary({ summary }: { summary: IAccountOperationsSummary }) {
	const { t } = useBntTranslate();

	return (
		<BntCarousel
			ariaLabel={t(texts_s.summary)}
			className={styles.summaryCarousel}
			dataTestId="account-operations-summary"
			nextLabel={t(texts_n.next, { capitalize: true })}
			previousLabel={t(texts_p.previous, { capitalize: true })}
		>
			<AccountOperationSummaryCard
				caption={`${summary.purchasesCount} ${t(texts_p.purchase, { count: summary.purchasesCount })}`}
				icon={<ShoppingBagOutlined />}
				label={t(texts_s.spent_coins, { capitalize: true })}
				tone="orange"
				value={String(summary.spentCoins)}
			/>
			<AccountOperationSummaryCard
				caption={t(texts_r.refunds_description, { capitalize: true })}
				icon={<UndoRounded />}
				label={t(texts_r.returned, { capitalize: true })}
				tone="green"
				value={`+${summary.returnedCoins}`}
			/>
			<AccountOperationSummaryCard
				caption={t(texts_d.donuts_received_description, { capitalize: true })}
				icon={<DonutSmallOutlined />}
				label={t(texts_d.donuts_received, { capitalize: true })}
				tone="purple"
				value={`+${summary.receivedDonuts}`}
			/>
		</BntCarousel>
	);
}
