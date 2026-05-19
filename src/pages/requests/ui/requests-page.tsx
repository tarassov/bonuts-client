import { useCallback, useEffect, useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import { CheckRounded, CloseRounded, SearchRounded, TaskAltRounded } from "@mui/icons-material";
import { CircularProgress, InputAdornment, MenuItem } from "@mui/material";

import { useDebounceCallback } from "usehooks-ts";

import { BntCard } from "@/shared/ui/card";
import { BntTextInput } from "@/shared/ui/input";
import { useLoader } from "@/shared/ui/loader";
import { BntStack } from "@/shared/ui/stack";
import { BntSegmentedTabs } from "@/shared/ui/tab";
import { BntTypography } from "@/shared/ui/typography";

import { myRequestsTabs, requestsTabs, requestsViewConfig, type TRequestSort, type TRequestsTab, type TRequestsView } from "../model/request-feed";
import { sortRequests } from "../model/request-feed.helpers";
import { useRequestsFeed } from "../model/use-requests-feed";

import { RequestFeedItem } from "./request-feed-item";
import styles from "./requests-page.module.scss";
import { Sorting } from "@/constants/dictionary";
import { Modules } from "@/constants/modules";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useRequestLogic } from "@/logic/hooks/request/use-request-logic";
import { texts_a, texts_c, texts_d, texts_n, texts_o, texts_r, texts_s } from "@/services/localization/texts";

type RequestsPageProps = {
	initialTab?: TRequestsTab;
	variant?: TRequestsView;
};

export const RequestsPage = ({ initialTab = "incoming", variant = "team" }: RequestsPageProps) => {
	const { translate } = useBntTranslate();
	const viewConfig = requestsViewConfig[variant];
	const [activeTab, setActiveTab] = useState<TRequestsTab>(initialTab);
	const [searchValue, setSearchValue] = useState("");
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState<TRequestSort>("newest");
	const debouncedSetSearch = useDebounceCallback(setSearch, 500);
	const { activateRequest, closeRequest, refundRequest, rollbackRequest } = useRequestLogic();
	const { fetchNext, hasNext, isFetching, isLoading, refetch, requests, tabCounts } = useRequestsFeed({
		search,
		tab: activeTab,
		view: variant,
	});

	useLoader(Modules.Requests, isLoading);

	useEffect(() => {
		setActiveTab(initialTab);
	}, [initialTab]);

	const sortedRequests = useMemo(() => sortRequests(requests, sort), [requests, sort]);

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchValue(value);
			debouncedSetSearch(value.trim());
		},
		[debouncedSetSearch]
	);

	const handlePrimaryAction = useCallback(
		(requestId: number) => {
			if (variant === "my") return;

			if (activeTab === "incoming") {
				activateRequest(requestId, { onSuccess: () => refetch() });
				return;
			}

			if (activeTab === "active") {
				closeRequest(requestId, { onSuccess: () => refetch() });
			}
		},
		[activeTab, activateRequest, closeRequest, refetch, variant]
	);

	const handleSecondaryAction = useCallback(
		(requestId: number) => {
			if (variant === "my") {
				refundRequest(requestId, { onSuccess: () => refetch() });
				return;
			}

			if (activeTab === "incoming") {
				refundRequest(requestId, { onSuccess: () => refetch() });
				return;
			}

			if (activeTab === "active") {
				rollbackRequest(requestId, { onSuccess: () => refetch() });
			}
		},
		[activeTab, refundRequest, refetch, rollbackRequest, variant]
	);

	const handleLoadMore = useCallback(
		(inView: boolean) => {
			if (!inView || isLoading) return;

			fetchNext();
		},
		[fetchNext, isLoading]
	);

	const primaryActionLabel = activeTab === "incoming" ? translate(texts_a.accept) : translate(texts_c.close);
	const secondaryActionLabel = variant === "my" ? translate(texts_c.cancel) : activeTab === "incoming" ? translate(texts_d.decline) : translate(texts_r.refund);
	const primaryActionIcon = activeTab === "incoming" ? <CheckRounded /> : <TaskAltRounded />;
	const tabs = variant === "my" ? myRequestsTabs : requestsTabs;

	return (
		<BntStack
			className={styles.page}
			sx={{
				"--requests-border": (theme) => theme.palette.divider,
			}}
		>
			<div className={styles.header}>
				<BntTypography variant="h4" fontWeight={700}>
					{translate(viewConfig.title, { capitalize: true })}
				</BntTypography>
				<BntTypography sx={{ color: "text.secondary" }} variant="body1">
					{translate(viewConfig.subtitle)}
				</BntTypography>
			</div>

			<BntSegmentedTabs
				ariaLabel={translate(viewConfig.title)}
				items={tabs.map((tab) => ({
					count: tab.value === "closed" ? undefined : tabCounts[tab.value],
					label: translate(tab.label, { capitalize: tab.value !== "incoming" }),
					value: tab.value,
				}))}
				onChange={setActiveTab}
				value={activeTab}
			/>

			<BntCard
				className={styles.panel}
				sx={{
					borderRadius: 2,
					border: (theme) => `1px solid ${theme.palette.divider}`,
					boxShadow: (theme) => (theme.palette.mode === "dark" ? "0 12px 28px rgba(0,0,0,0.28)" : "0 12px 32px rgba(30,31,37,0.06)"),
				}}
			>
				<div className={styles.toolbar}>
					<BntTextInput
						className={styles.searchField}
						clearable
						name="requests-search"
						onChange={(event) => handleSearchChange(event.target.value)}
						onClear={() => handleSearchChange("")}
						placeholder={texts_s.search_by_name_email_or_position}
						size="small"
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<SearchRounded color="action" />
									</InputAdornment>
								),
							},
						}}
						sx={{
							"& .MuiInput-root": {
								"&::before, &::after": {
									display: "none",
								},
								"&:hover:not(.Mui-disabled, .Mui-error):before": {
									display: "none",
								},
							},
							"& .MuiInputBase-root": {
								borderRadius: 2,
								border: (theme) => `1px solid ${theme.palette.divider}`,
								backgroundColor: "background.paper",
								px: 1,
							},
						}}
						value={searchValue}
					/>

					<BntTextInput
						name="requests-sort"
						onChange={(event) => setSort(event.target.value as TRequestSort)}
						select
						size="small"
						sx={{
							"& .MuiInput-root": {
								"&::before, &::after": {
									display: "none",
								},
								"&:hover:not(.Mui-disabled, .Mui-error):before": {
									display: "none",
								},
							},
							"& .MuiInputBase-root": {
								borderRadius: 2,
								border: (theme) => `1px solid ${theme.palette.divider}`,
								backgroundColor: "background.paper",
								px: 1,
							},
						}}
						value={sort}
					>
						<MenuItem value="newest">{translate(Sorting.NEWEST)}</MenuItem>
						<MenuItem value="oldest">{translate(texts_o.oldest_first)}</MenuItem>
					</BntTextInput>
				</div>

				<div className={styles.list}>
					{sortedRequests.map((request) => (
						<RequestFeedItem
							isMyRequestView={variant === "my"}
							key={request.id}
							primaryAction={
								activeTab === "closed" || variant === "my"
									? undefined
									: {
											icon: primaryActionIcon,
											label: primaryActionLabel,
											onClick: () => handlePrimaryAction(request.id),
											tone: activeTab === "incoming" ? "success" : "primary",
										}
							}
							request={request}
							secondaryAction={
								activeTab === "closed" || (variant === "my" && request.status !== 0)
									? undefined
									: {
											icon: <CloseRounded />,
											label: secondaryActionLabel,
											onClick: () => handleSecondaryAction(request.id),
											tone: "error",
										}
							}
						/>
					))}

					{!isLoading && !sortedRequests.length ? (
						<div className={styles.emptyState}>
							<BntTypography fontWeight={700} variant="h6">
								{translate(texts_n.no_requests_found)}
							</BntTypography>
							<BntTypography sx={{ color: "text.secondary", mt: 1 }} variant="body2">
								{translate(texts_s.search_by_name_email_or_position)}
							</BntTypography>
						</div>
					) : null}

					{isLoading ? (
						<div className={styles.loader}>
							<CircularProgress size={28} />
						</div>
					) : null}

					{hasNext && sortedRequests.length ? (
						<InView as="div" className={styles.loader} onChange={handleLoadMore}>
							{isFetching ? <CircularProgress size={24} /> : null}
						</InView>
					) : null}
				</div>
			</BntCard>
		</BntStack>
	);
};
