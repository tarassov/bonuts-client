import type { ReactNode } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpwardRounded, DonutSmallOutlined, EmojiEventsOutlined, LocalFireDepartmentOutlined, RemoveRounded, WorkspacePremiumOutlined } from "@mui/icons-material";
import { Avatar, Box, ButtonBase, LinearProgress, styled } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useGetWeeklyRecognitionBadgesLatestQuery } from "services/api/bonuts-api";
import { texts_i, texts_l, texts_n, texts_p, texts_r, texts_s, texts_t, texts_y } from "services/localization/texts";
import { GradientCard } from "shared/ui/card/gradient-card";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography";

import { useProfile } from "@/entities/profile";

import { useAccountBalanceLoader } from "logic/hooks/account/use-account-balance-loader";
import { useEmployeeUi } from "logic/ui/use-employee-ui";

type TRankedProfile = {
	id: number;
	avatar: string;
	name: string;
	score: number;
	badgeCount: number;
	topBadgeTitle: string;
	rank: number;
};

type TStatusLevel = {
	icon: ReactNode;
	key: texts_s | texts_r | texts_t;
	minScore: number;
	tone: "primary" | "secondary" | "warning" | "success";
};

const SidebarCard = styled(GradientCard)(({ theme }) => ({
	padding: theme.spacing(2),
	borderRadius: theme.spacing(2),
	height: "100%",
}));

const SidebarGrid = styled(Box)(({ theme }) => ({
	width: "100%",
	display: "grid",
	gridTemplateColumns: "1fr",
	gap: theme.spacing(2),
	[theme.breakpoints.up("lg")]: {
		gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
		alignItems: "stretch",
	},
}));

const RankPill = styled(Box)(({ theme }) => ({
	minWidth: 32,
	height: 32,
	borderRadius: 999,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.palette.common.white,
	color: theme.palette.primary.main,
	fontWeight: 700,
}));

const LeaderButton = styled(ButtonBase)(({ theme }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1.25),
	padding: theme.spacing(0.5),
	borderRadius: theme.spacing(1.5),
	textAlign: "left",
	justifyContent: "flex-start",
	transition: theme.transitions.create(["background-color", "transform"]),
	"&:hover": {
		backgroundColor: theme.palette.common.white,
		transform: "translateX(2px)",
	},
}));

const STATUS_LEVELS: TStatusLevel[] = [
	{ key: texts_s.social_newcomer, minScore: 0, tone: "primary", icon: <WorkspacePremiumOutlined /> },
	{ key: texts_s.steady_contributor, minScore: 40, tone: "secondary", icon: <LocalFireDepartmentOutlined /> },
	{ key: texts_r.recognized_voice, minScore: 120, tone: "warning", icon: <EmojiEventsOutlined /> },
	{ key: texts_t.team_star, minScore: 240, tone: "success", icon: <WorkspacePremiumOutlined /> },
];

function getDisplayName(profile?: { first_name?: string | null; last_name?: string | null; full_name?: string; name?: string }) {
	const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim();

	return fullName || profile?.full_name || profile?.name || "";
}

function getRankedProfiles(
	badges: Array<{
		score: number;
		title: string;
		profile: { id: number; first_name: string; last_name: string; full_name: string; avatar: string };
	}>
) {
	const rankedMap = new Map<number, Omit<TRankedProfile, "rank">>();

	badges.forEach((badge) => {
		const current = rankedMap.get(badge.profile.id);
		const name = getDisplayName(badge.profile);

		if (!current) {
			rankedMap.set(badge.profile.id, {
				id: badge.profile.id,
				avatar: badge.profile.avatar,
				name,
				score: badge.score,
				badgeCount: 1,
				topBadgeTitle: badge.title,
			});

			return;
		}

		rankedMap.set(badge.profile.id, {
			...current,
			score: current.score + badge.score,
			badgeCount: current.badgeCount + 1,
			topBadgeTitle: badge.score > current.score ? badge.title : current.topBadgeTitle,
		});
	});

	return [...rankedMap.values()]
		.sort((left, right) => right.score - left.score || right.badgeCount - left.badgeCount || left.name.localeCompare(right.name))
		.map((item, index) => ({ ...item, rank: index + 1 }));
}

export function DashboardSocialSidebar() {
	const { t } = useBntTranslate();
	const { t: i18nT } = useTranslation();
	const { profile, authTenant } = useProfile();
	const { showEmployeeModal } = useEmployeeUi();
	const { data } = useGetWeeklyRecognitionBadgesLatestQuery({ tenant: authTenant || undefined }, { skip: !authTenant });
	const { account: selfAccount, isLoading: isSelfBalanceLoading } = useAccountBalanceLoader(profile?.self_account?.id);
	const { account: distribAccount, isLoading: isDistribBalanceLoading } = useAccountBalanceLoader(profile?.distrib_account?.id);

	const rankedProfiles = useMemo(() => getRankedProfiles(data?.badges || []), [data?.badges]);
	const topThree = rankedProfiles.slice(0, 3);
	const currentRank = rankedProfiles.find((item) => item.id === profile?.id);
	const scoreTotal = profile?.score_total || 0;
	const currentStatusIndex = STATUS_LEVELS.reduce((result, level, index) => (scoreTotal >= level.minScore ? index : result), 0);
	const currentStatus = STATUS_LEVELS[currentStatusIndex];
	const nextStatus = STATUS_LEVELS[currentStatusIndex + 1];
	const progressMax = nextStatus ? nextStatus.minScore - currentStatus.minScore : 1;
	const progressValue = nextStatus ? scoreTotal - currentStatus.minScore : progressMax;
	const progressPercent = nextStatus ? Math.min(100, Math.max(0, (progressValue / progressMax) * 100)) : 100;

	return (
		<SidebarGrid>
			<SidebarCard secondary>
				<BntStack gap={2}>
					<BntStack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
						<BntTypography variant="h6">{t(texts_l.leaders_of_the_week, { capitalize: true })}</BntTypography>
					</BntStack>
					{topThree.length ? (
						<BntStack gap={1.25}>
							{topThree.map((leader) => (
								<LeaderButton key={leader.id} onClick={() => showEmployeeModal(leader.id)}>
									<RankPill>{leader.rank}</RankPill>
									<Avatar src={leader.avatar || undefined} alt={leader.name}>
										{leader.name[0]}
									</Avatar>
									<Box sx={{ minWidth: 0, flex: 1 }}>
										<BntTypography variant="body2" fontWeight={700} noWrap>
											{leader.name}
										</BntTypography>
										<BntTypography variant="caption" color="text.secondary" noWrap>
											{leader.topBadgeTitle}
										</BntTypography>
									</Box>
									<BntTypography variant="body2" fontWeight={700} color="primary.main">
										{leader.score}
									</BntTypography>
								</LeaderButton>
							))}
						</BntStack>
					) : (
						<BntTypography variant="body2" color="text.secondary">
							{t(texts_n.no_weekly_leaders_yet, { capitalize: true })}
						</BntTypography>
					)}
				</BntStack>
			</SidebarCard>

			<SidebarCard secondary>
				<BntStack gap={1}>
					<BntTypography variant="subtitle1" fontWeight={700}>
						{t(texts_y.your_position, { capitalize: true })}
					</BntTypography>
					<BntStack direction="row" alignItems="center" gap={1}>
						<BntTypography variant="h4" color="primary.main">
							{currentRank ? `#${currentRank.rank}` : "—"}
						</BntTypography>
						{currentRank ? <ArrowUpwardRounded color="success" fontSize="small" /> : <RemoveRounded color="disabled" fontSize="small" />}
					</BntStack>
					<BntTypography variant="body2" color="text.secondary">
						{currentRank ? `${t("position", { capitalize: true })} ${currentRank.rank}` : t(texts_n.no_rank_yet, { capitalize: true })}
					</BntTypography>
				</BntStack>
			</SidebarCard>

			<SidebarCard>
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
			</SidebarCard>

			<SidebarCard secondary>
				<BntStack gap={1.5}>
					<BntTypography variant="subtitle1" fontWeight={700}>
						{t("Balance")}
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
			</SidebarCard>
		</SidebarGrid>
	);
}
