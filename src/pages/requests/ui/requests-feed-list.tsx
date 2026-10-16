import type { FC, ReactNode } from "react";
import { InView } from "react-intersection-observer";
import { CloseRounded } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import { BntTypography } from "@/shared/ui/typography";

import { RequestsTab, RequestsView } from "../model/request-feed";

import { RequestFeedItem } from "./request-feed-item";
import styles from "./requests-feed-list.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_n, texts_s } from "@/services/localization/texts";
import type { TRequest } from "@/types/model/request";

type TRequestItemActionTone = "primary" | "success" | "error";

type TRequestFeedListProps = {
	activeTab: RequestsTab;
	hasNext: boolean;
	isFetching: boolean;
	isLoading: boolean;
	onLoadMore: (inView: boolean) => void;
	onPrimaryAction: (requestId: number) => void;
	onSecondaryAction: (requestId: number) => void;
	primaryActionIcon: ReactNode;
	primaryActionLabel: string;
	requests: Array<TRequest>;
	secondaryActionLabel: string;
	variant: RequestsView;
};

export const RequestsFeedList: FC<TRequestFeedListProps> = ({
	activeTab,
	hasNext,
	isFetching,
	isLoading,
	onLoadMore,
	onPrimaryAction,
	onSecondaryAction,
	primaryActionIcon,
	primaryActionLabel,
	requests,
	secondaryActionLabel,
	variant,
}) => {
	const { translate } = useBntTranslate();
	const isMyRequestView = variant === RequestsView.My;
	const primaryActionTone: TRequestItemActionTone = activeTab === RequestsTab.Incoming ? "success" : "primary";

	return (
		<div className={styles.list}>
			{requests.map((request) => (
				<RequestFeedItem
					isMyRequestView={isMyRequestView}
					key={request.id}
					primaryAction={
						activeTab === RequestsTab.Closed || isMyRequestView
							? undefined
							: {
									icon: primaryActionIcon,
									label: primaryActionLabel,
									onClick: () => onPrimaryAction(request.id),
									tone: primaryActionTone,
								}
					}
					request={request}
					secondaryAction={
						activeTab === RequestsTab.Closed || (isMyRequestView && request.status !== 0)
							? undefined
							: {
									icon: <CloseRounded />,
									label: secondaryActionLabel,
									onClick: () => onSecondaryAction(request.id),
									tone: "error",
								}
					}
				/>
			))}

			{!isLoading && !requests.length ? (
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

			{hasNext && requests.length ? (
				<InView as="div" className={styles.loader} onChange={onLoadMore}>
					{isFetching ? <CircularProgress size={24} /> : null}
				</InView>
			) : null}
		</div>
	);
};
