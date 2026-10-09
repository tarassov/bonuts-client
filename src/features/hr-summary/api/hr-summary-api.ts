import { bonutsApi } from "services/api/bonuts-api";

import { ApiTags } from "@/shared/api";

import type { THrSummary } from "../model/hr-summary.types";

type THrSummaryListResponse = { data: THrSummary[] };
type THrSummaryResponse = { data: THrSummary };

type TGetHrSummaryThreadArg = { tenant: string };
type TRequestHrSummaryArg = { tenant: string; dateFrom: string; dateTo: string };

// The generated endpoints type the payload as `object`; these wrappers carry the real summary shape.
const hrSummaryApiEnhanced = bonutsApi.enhanceEndpoints({
	addTagTypes: [ApiTags.HrSummaries],
});

export const hrSummaryApi = hrSummaryApiEnhanced.injectEndpoints({
	endpoints: (build) => ({
		getHrSummaryThread: build.query<THrSummary[], TGetHrSummaryThreadArg>({
			query: ({ tenant }) => ({ url: "/hr_summaries", params: { tenant } }),
			transformResponse: (response: THrSummaryListResponse) => response.data,
			providesTags: [ApiTags.HrSummaries],
		}),
		requestHrSummary: build.mutation<THrSummary, TRequestHrSummaryArg>({
			query: ({ tenant, dateFrom, dateTo }) => ({
				url: "/hr_summaries",
				method: "POST",
				params: { tenant },
				body: { date_from: dateFrom, date_to: dateTo },
			}),
			transformResponse: (response: THrSummaryResponse) => response.data,
			invalidatesTags: [ApiTags.HrSummaries],
		}),
	}),
	overrideExisting: false,
});

export const { useGetHrSummaryThreadQuery, useRequestHrSummaryMutation } = hrSummaryApi;
