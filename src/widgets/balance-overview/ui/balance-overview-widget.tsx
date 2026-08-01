import { DonutSmallOutlined, WorkspacePremiumOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

import type { IDashboardWidgetSizingProps } from "@/shared/ui/dashboard-widget-card";
import { DashboardWidgetCard } from "@/shared/ui/dashboard-widget-card";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useProfile } from "@/entities/profile";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useAccountBalanceLoader } from "@/logic/hooks/account/use-account-balance-loader";
import { useEmployeeUi } from "@/logic/ui/use-employee-ui";
import { texts_b, texts_c, texts_d, texts_i, texts_o } from "@/services/localization/texts";

export function BalanceOverviewWidget({ columns = 1 }: IDashboardWidgetSizingProps) {
	const { t } = useBntTranslate();
	const { profile } = useProfile();
	const { toAccountOperations } = useEmployeeUi(profile);
	const { account: selfAccount, isLoading: isSelfBalanceLoading } = useAccountBalanceLoader(profile?.self_account?.id);
	const { account: distribAccount, isLoading: isDistribBalanceLoading } = useAccountBalanceLoader(profile?.distrib_account?.id);

	return (
		<DashboardWidgetCard ariaLabel={t(texts_o.operations_history, { capitalize: true })} columns={columns} onClick={toAccountOperations}>
			<BntStack gap={1.5} data-testid="dashboard-widget-balance-overview">
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
							{isDistribBalanceLoading ? "..." : `${distribAccount?.balance || 0} ${t(texts_d.donut, { count: distribAccount?.balance })}`}
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
							{isSelfBalanceLoading ? "..." : `${selfAccount?.balance || 0} ${t(texts_c.coin, { count: selfAccount?.balance })}`}
						</BntTypography>
					</Box>
				</BntStack>
			</BntStack>
		</DashboardWidgetCard>
	);
}
