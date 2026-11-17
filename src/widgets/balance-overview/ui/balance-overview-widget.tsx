import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DonutSmallOutlined } from "@mui/icons-material";
import { Box, Link } from "@mui/material";

import { BntRoutes } from "@/shared/config/routes";
import type { IDashboardWidgetSizingProps } from "@/shared/ui/dashboard-widget-card";
import { DashboardWidgetCard } from "@/shared/ui/dashboard-widget-card";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useEmployeeUi, useProfile } from "@/entities/profile";

import { BalanceAction, BalanceRow } from "./balance-overview.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useIcons } from "@/hooks/use-icons";
import { useAccountBalanceLoader } from "@/logic/hooks/account/use-account-balance-loader";
import { routesPath } from "@/routes/config/routes-path";
import { texts_b, texts_c, texts_d, texts_g, texts_i, texts_o } from "@/services/localization/texts";

export function BalanceOverviewWidget({ columns = 1, children }: IDashboardWidgetSizingProps & { children?: ReactNode }) {
	const { t } = useBntTranslate();
	const { BonutsCurrency } = useIcons({ width: "20px", height: "20px", variant: "primary" });
	const { profile } = useProfile();
	const { toAccountOperations } = useEmployeeUi(profile);
	const { account: selfAccount, isLoading: isSelfBalanceLoading } = useAccountBalanceLoader(profile?.self_account?.id);
	const { account: distribAccount, isLoading: isDistribBalanceLoading } = useAccountBalanceLoader(profile?.distrib_account?.id);
	const title = t(texts_b.balance, { capitalize: true });
	const handleOpenAccountOperations = () => toAccountOperations();

	return (
		<DashboardWidgetCard footer={children} columns={columns} title={title}>
			<BntStack gap={1} data-testid="dashboard-widget-balance-overview">
				<BalanceRow>
					<BalanceAction aria-label={t(texts_o.operations_history, { capitalize: true })} onClick={handleOpenAccountOperations}>
						<DonutSmallOutlined color="primary" sx={{ width: "20px", height: "20px" }} />
						<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", columnGap: 0.75 }}>
							<BntTypography variant="caption" color="text.secondary">
								{t(texts_i.i_can_share, { capitalize: true })}
							</BntTypography>
							<BntTypography variant="caption" fontWeight={700} color="primary.main">
								{isDistribBalanceLoading ? "..." : `${distribAccount?.balance || 0} ${t(texts_d.donut, { count: distribAccount?.balance })}`}
							</BntTypography>
						</Box>
					</BalanceAction>
				</BalanceRow>
				<BalanceRow tone="secondary">
					<BalanceAction aria-label={t(texts_o.operations_history, { capitalize: true })} onClick={handleOpenAccountOperations}>
						<BonutsCurrency />
						<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", columnGap: 0.75 }}>
							<BntTypography variant="caption" color="text.secondary">
								{t(texts_i.i_can_spend, { capitalize: true })}
							</BntTypography>
							<BntTypography variant="caption" fontWeight={700} color="secondary.main">
								{isSelfBalanceLoading ? "..." : `${selfAccount?.balance || 0} ${t(texts_c.coin, { count: selfAccount?.balance })}`}
							</BntTypography>
						</Box>
					</BalanceAction>
					<Link component={RouterLink} to={routesPath[BntRoutes.Donuts]} variant="caption" color="secondary.main" sx={{ flexShrink: 0, mr: 1.25 }}>
						{t(texts_g.go_to_store, { capitalize: true })} →
					</Link>
				</BalanceRow>
			</BntStack>
		</DashboardWidgetCard>
	);
}
