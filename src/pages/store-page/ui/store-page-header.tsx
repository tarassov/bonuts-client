import { Add } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_b, texts_s } from "services/localization/texts";

import { BntButton } from "@/shared/ui/buttons";
import { BntSectionHeader } from "@/shared/ui/section";
import { BntTypography } from "@/shared/ui/typography";

import styles from "./store-page-header.module.scss";

export function StorePageHeader({ onCreateClick }: { onCreateClick?: VoidFunction }) {
	const { t } = useBntTranslate();

	return (
		<BntSectionHeader className={styles.pageHeader}>
			<div>
				<BntTypography as="h1" className={styles.pageTitle}>
					{t(texts_s.store_showcase)}
				</BntTypography>
				<BntTypography as="p" color="text.secondary">
					{t(texts_b.build_storefront_description)}
				</BntTypography>
			</div>
			<BntButton color="primary" onClick={onCreateClick} startIcon={<Add />} variant="contained" noTransform>
				{t(texts_a.add_reward)}
			</BntButton>
		</BntSectionHeader>
	);
}
