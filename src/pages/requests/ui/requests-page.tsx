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

import { useRequestsFeed } from "../api/use-requests-feed";
import { RequestSort, RequestsTab, RequestsView, requestsViewConfig } from "../model/request-feed";
import { sortRequests } from "../model/request-feed-helpers";

import { RequestFeedItem } from "./request-feed-item";
import styles from "./requests-page.module.scss";
import { Sorting } from "@/constants/dictionary";
import { Modules } from "@/constants/modules";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useRequestLogic } from "@/logic/hooks/request/use-request-logic";
import { texts_a, texts_c, texts_d, texts_n, texts_o, texts_r, texts_s } from "@/services/localization/texts";

type RequestsPageProps = {
	initialTab?: RequestsTab;
	variant?: RequestsView;
};

export const RequestsPage = ({ initialTab = RequestsTab.Incoming, variant = RequestsView.Team }: RequestsPageProps) => {
	const { translate } = useBntTranslate();
	const viewConfig = requestsViewConfig[variant];
	const [activeTab, setActiveTab] = useState<RequestsTab>(initialTab);
	const [searchValue, setSearchValue] = useState("");
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState<RequestSort>(RequestSort.Newest);
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
			if (variant === RequestsView.My) return;

			if (activeTab === RequestsTab.Incoming) {
				activateRequest(requestId, { onSuccess: () => refetch() });
				return;
			}

			if (activeTab === RequestsTab.Active) {
				closeRequest(requestId, { onSuccess: () => refetch() });
			}
		},
		[activeTab, activateRequest, closeRequest, refetch, variant]
	);

	const handleSecondaryAction = useCallback(
		(requestId: number) => {
			if (variant === RequestsView.My) {
				refundRequest(requestId, { onSuccess: () => refetch() });
				return;
			}

			if (activeTab === RequestsTab.Incoming) {
				refundRequest(requestId, { onSuccess: () => refetch() });
				return;
			}

			if (activeTab === RequestsTab.Active) {
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

	const primaryActionLabel = activeTab === RequestsTab.Incoming ? translate(texts_a.accept) : translate(texts_c.close);
	const secondaryActionLabel = variant === RequestsView.My ? translate(texts_c.cancel) : activeTab === RequestsTab.Incoming ? translate(texts_d.decline) : translate(texts_r.refund);
	const primaryActionIcon = activeTab === RequestsTab.Incoming ? <CheckRounded /> : <TaskAltRounded />;

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
				items={viewConfig.tabs.map((tab) => ({
					count: tab.value === RequestsTab.Closed ? undefined : tabCounts[tab.value],
					label: translate(tab.label, { capitalize: tab.value !== RequestsTab.Incoming }),
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
						onChange={(event) => setSort(event.target.value as RequestSort)}
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
						<MenuItem value={RequestSort.Newest}>{translate(Sorting.NEWEST)}</MenuItem>
						<MenuItem value={RequestSort.Oldest}>{translate(texts_o.oldest_first)}</MenuItem>
					</BntTextInput>
				</div>

				<div className={styles.list}>
					{sortedRequests.map((request) => (
						<RequestFeedItem
							isMyRequestView={variant === RequestsView.My}
							key={request.id}
							primaryAction={
								activeTab === RequestsTab.Closed || variant === RequestsView.My
									? undefined
									: {
											icon: primaryActionIcon,
											label: primaryActionLabel,
											onClick: () => handlePrimaryAction(request.id),
											tone: activeTab === RequestsTab.Incoming ? "success" : "primary",
										}
							}
							request={request}
							secondaryAction={
								activeTab === RequestsTab.Closed || (variant === RequestsView.My && request.status !== 0)
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
