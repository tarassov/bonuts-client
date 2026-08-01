import { formatSignedNumber } from "@/shared/lib/number";
import { BntSection, BntSectionHeader } from "@/shared/ui/section";
import { BntTypography } from "@/shared/ui/typography";

import type { IAccountOperationGroup } from "../model/account-operations-types";

import { AccountOperationRow } from "./account-operation-row";
import styles from "./account-operations-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_d, texts_o } from "@/services/localization/texts";

export function AccountOperationGroup({ group }: { group: IAccountOperationGroup }) {
	const { t } = useBntTranslate();
	const totalParts = [
		group.coinTotal ? `${formatSignedNumber(group.coinTotal)} ${t(texts_c.coin, { count: Math.abs(group.coinTotal) })}` : "",
		group.donutTotal ? `${formatSignedNumber(group.donutTotal)} ${t(texts_d.donut, { count: Math.abs(group.donutTotal) })}` : "",
	].filter(Boolean);

	return (
		<BntSection className={styles.operationGroup}>
			<BntSectionHeader className={styles.groupHeader}>
				<BntTypography as="h2" fontWeight={700} variant="body2">
					{group.label.charAt(0).toUpperCase() + group.label.slice(1)}
				</BntTypography>
				<div className={styles.groupMeta}>
					<BntTypography color="text.secondary" variant="caption">
						{group.items.length} {t(texts_o.operation, { count: group.items.length })}
					</BntTypography>
					{totalParts.length ? <BntTypography variant="caption">{totalParts.join(" · ")}</BntTypography> : null}
				</div>
			</BntSectionHeader>
			{group.items.map((operation) => (
				<AccountOperationRow key={operation.id} operation={operation} />
			))}
		</BntSection>
	);
}
