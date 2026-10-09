import { useCallback, useEffect, useMemo, useState } from "react";

import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth";

import { useGetHrSummaryThreadQuery, useRequestHrSummaryMutation } from "../api/hr-summary-api";

import type { THrSummaryPeriod } from "./hr-summary.types";
import { hasActiveSummary, sortThreadChronologically, toApiDate } from "./hr-summary-helper";
import { useNow } from "./use-now";

/** While a summary is being generated in the background the thread is refreshed this often. */
const PENDING_POLL_INTERVAL_MS = 5000;
/** Elapsed-time labels and the stale check are refreshed this often. */
const CLOCK_INTERVAL_MS = 30_000;

export const useHrSummaryThread = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const now = useNow(CLOCK_INTERVAL_MS);
	const [pollingInterval, setPollingInterval] = useState(0);
	const { data, isLoading } = useGetHrSummaryThreadQuery({ tenant: authTenant ?? "" }, { skip: !authTenant, pollingInterval });
	const [requestSummary, { isLoading: isRequesting }] = useRequestHrSummaryMutation();

	const thread = useMemo(() => sortThreadChronologically(data ?? []), [data]);
	const hasActive = hasActiveSummary(thread, now);

	useEffect(() => {
		setPollingInterval(hasActive ? PENDING_POLL_INTERVAL_MS : 0);
	}, [hasActive]);

	const request = useCallback(
		async (period: THrSummaryPeriod) => {
			if (!authTenant) return;

			await requestSummary({ tenant: authTenant, dateFrom: toApiDate(period.dateFrom), dateTo: toApiDate(period.dateTo) }).unwrap();
		},
		[authTenant, requestSummary]
	);

	return {
		thread,
		now,
		isLoading,
		isRequesting,
		hasActive,
		request,
	};
};
