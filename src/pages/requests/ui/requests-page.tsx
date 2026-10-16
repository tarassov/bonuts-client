import { useCallback, useEffect, useMemo, useState } from "react";
import { ArchiveOutlined, CheckRounded, ForwardToInboxOutlined, InboxOutlined, TaskAltRounded } from "@mui/icons-material";

import { useDebounceCallback } from "usehooks-ts";

import { BntBreadcrumbs } from "@/shared/ui/breadcrumb";
import { useLoader } from "@/shared/ui/loader";
import { BntStack } from "@/shared/ui/stack";
import { BntSegmentedTabs } from "@/shared/ui/tab";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";

import { useRequestsFeed } from "../api/use-requests-feed";
import { RequestSort, RequestsTab, RequestsView, requestsViewConfig } from "../model/request-feed";
import { sortRequests } from "../model/request-feed-helpers";

import { RequestsFeedList } from "./requests-feed-list";
import styles from "./requests-page.module.scss";
import { RequestsPagePanel } from "./requests-page-panel";
import { RequestsPageToolbar } from "./requests-page-toolbar";
import { Modules } from "@/constants/modules";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useRequestLogic } from "@/logic/hooks/request/use-request-logic";
import { routesPath } from "@/routes/config/routes-path";
import { texts_a, texts_c, texts_d, texts_r } from "@/services/localization/texts";

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
	const activeTabConfig = viewConfig.tabs.find((tab) => tab.value === activeTab);
	const activeTabIcon = activeTab === RequestsTab.Closed ? <ArchiveOutlined /> : activeTab === RequestsTab.Active ? <InboxOutlined /> : <ForwardToInboxOutlined />;
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			icon: <ForwardToInboxOutlined />,
			key: viewConfig.title,
			label: viewConfig.title,
			link: variant === RequestsView.My ? routesPath.MyRequests : routesPath.Requests,
		},
		...(activeTabConfig
			? [
					{
						icon: activeTabIcon,
						key: activeTabConfig.label,
						label: activeTabConfig.label,
					},
				]
			: []),
	];

	return (
		<BntStack
			className={styles.page}
			sx={{
				"--requests-border": (theme) => theme.palette.divider,
			}}
		>
			<BntBreadcrumbs className={styles.header} items={breadcrumbs} />

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

			<RequestsPagePanel className={styles.panel}>
				<RequestsPageToolbar onSearchChange={handleSearchChange} onSortChange={setSort} searchValue={searchValue} sort={sort} />
				<RequestsFeedList
					activeTab={activeTab}
					hasNext={hasNext}
					isFetching={isFetching}
					isLoading={isLoading}
					onLoadMore={handleLoadMore}
					onPrimaryAction={handlePrimaryAction}
					onSecondaryAction={handleSecondaryAction}
					primaryActionIcon={primaryActionIcon}
					primaryActionLabel={primaryActionLabel}
					requests={sortedRequests}
					secondaryActionLabel={secondaryActionLabel}
					variant={variant}
				/>
			</RequestsPagePanel>
		</BntStack>
	);
};
