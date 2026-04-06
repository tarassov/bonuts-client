import { DonutSmallOutlined, WorkspacePremiumOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useProfile } from "@/entities/profile";

import type { IDashboardWidgetSizingProps } from "@/widgets/dashboard-social";
import { DashboardSocialWidgetCard } from "@/widgets/dashboard-social";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useAccountBalanceLoader } from "@/logic/hooks/account/use-account-balance-loader";
import { texts_b, texts_i } from "@/services/localization/texts";

export function BalanceOverviewWidget({ columns = 1 }: IDashboardWidgetSizingProps) {
	const { t } = useBntTranslate();
	const { profile } = useProfile();
	const { account: selfAccount, isLoading: isSelfBalanceLoading } = useAccountBalanceLoader(profile?.self_account?.id);
	const { account: distribAccount, isLoading: isDistribBalanceLoading } = useAccountBalanceLoader(profile?.distrib_account?.id);

	return (
		<DashboardSocialWidgetCard columns={columns}>
			<BntStack gap={1.5}>
				<BntTypography variant="subtitle1" fontWeight={700}>
					{t(texts_b.balance, { capitalize: true })}
				</BntTypography>
				<BntStack direction="row" alignItems="center" gap={1}>
					<DonutSmallOutlined color="primary" />
					<Box>
						<BntTypography variant="body2" fontWeight={700}>
							{t(texts_i.i_can_share, { capitalize: true })}
						</BntTypography>
						<BntTypography variant="caption" color="text.secondary">
							{isDistribBalanceLoading ? "..." : `${distribAccount?.balance || 0} ${t("donut", { count: distribAccount?.balance })}`}
						</BntTypography>
					</Box>
				</BntStack>
				<BntStack direction="row" alignItems="center" gap={1}>
					<WorkspacePremiumOutlined color="secondary" />
					<Box>
						<BntTypography variant="body2" fontWeight={700}>
							{t(texts_i.i_can_spend, { capitalize: true })}
						</BntTypography>
						<BntTypography variant="caption" color="text.secondary">
							{isSelfBalanceLoading ? "..." : `${selfAccount?.balance || 0} ${t("point", { count: selfAccount?.balance })}`}
						</BntTypography>
					</Box>
				</BntStack>
			</BntStack>
		</DashboardSocialWidgetCard>
	);
}
