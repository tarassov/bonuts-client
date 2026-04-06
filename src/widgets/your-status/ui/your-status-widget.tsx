import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { EmojiEventsOutlined, LocalFireDepartmentOutlined, WorkspacePremiumOutlined } from "@mui/icons-material";
import { Box, LinearProgress } from "@mui/material";

import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useProfile } from "@/entities/profile";

import type { IDashboardWidgetSizingProps } from "@/widgets/dashboard-social";
import { DashboardSocialWidgetCard } from "@/widgets/dashboard-social";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_n, texts_p, texts_r, texts_s, texts_t, texts_y } from "@/services/localization/texts";

type TStatusLevel = {
	icon: ReactNode;
	key: texts_s | texts_r | texts_t;
	minScore: number;
	tone: "primary" | "secondary" | "warning" | "success";
};

const STATUS_LEVELS: TStatusLevel[] = [
	{ key: texts_s.social_newcomer, minScore: 0, tone: "primary", icon: <WorkspacePremiumOutlined /> },
	{ key: texts_s.steady_contributor, minScore: 40, tone: "secondary", icon: <LocalFireDepartmentOutlined /> },
	{ key: texts_r.recognized_voice, minScore: 120, tone: "warning", icon: <EmojiEventsOutlined /> },
	{ key: texts_t.team_star, minScore: 240, tone: "success", icon: <WorkspacePremiumOutlined /> },
];

export function YourStatusWidget({ columns = 1 }: IDashboardWidgetSizingProps) {
	const { t } = useBntTranslate();
	const { t: i18nT } = useTranslation();
	const { profile } = useProfile();

	const scoreTotal = profile?.score_total || 0;
	const currentStatusIndex = STATUS_LEVELS.reduce((result, level, index) => (scoreTotal >= level.minScore ? index : result), 0);
	const currentStatus = STATUS_LEVELS[currentStatusIndex];
	const nextStatus = STATUS_LEVELS[currentStatusIndex + 1];
	const progressMax = nextStatus ? nextStatus.minScore - currentStatus.minScore : 1;
	const progressValue = nextStatus ? scoreTotal - currentStatus.minScore : progressMax;
	const progressPercent = nextStatus ? Math.min(100, Math.max(0, (progressValue / progressMax) * 100)) : 100;

	return (
		<DashboardSocialWidgetCard columns={columns}>
			<BntStack gap={1.5}>
				<BntTypography variant="subtitle1" fontWeight={700}>
					{t(texts_y.your_status, { capitalize: true })}
				</BntTypography>
				<BntStack direction="row" alignItems="center" gap={1.5}>
					<Box
						sx={(theme) => ({
							width: 44,
							height: 44,
							borderRadius: "50%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: theme.palette[currentStatus.tone].light,
							color: theme.palette[currentStatus.tone].main,
						})}
					>
						{currentStatus.icon}
					</Box>
					<Box>
						<BntTypography variant="body1" fontWeight={700}>
							{t(currentStatus.key, { capitalize: true })}
						</BntTypography>
						<BntTypography variant="caption" color="text.secondary">
							{scoreTotal} {t("point", { count: scoreTotal })}
						</BntTypography>
					</Box>
				</BntStack>
				<LinearProgress variant="determinate" value={progressPercent} color={currentStatus.tone} sx={{ height: 8, borderRadius: 99 }} />
				<BntStack direction="row" justifyContent="space-between" gap={1}>
					<BntTypography variant="caption" color="text.secondary">
						{t(texts_s.status, { capitalize: true })}
					</BntTypography>
					<BntTypography variant="caption" color="text.secondary" textAlign="right">
						{nextStatus
							? i18nT(texts_p.points_to_next_status, { count: nextStatus.minScore - scoreTotal, status: t(nextStatus.key, { capitalize: true }) })
							: t(texts_n.next_status, { capitalize: true })}
					</BntTypography>
				</BntStack>
			</BntStack>
		</DashboardSocialWidgetCard>
	);
}
