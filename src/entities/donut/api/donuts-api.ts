import { ApiTags } from "@/shared/api";
import { cacheByIdArgProperty, getNextPageParam, getTransformPageableResponse, providesInfiniteList } from "@/shared/lib/rtk";

import type { GetDonutsApiArg, GetDonutsApiResponse } from "@/services/api/bonuts-api";
import { bonutsApiOverride } from "@/services/api/injected-api";
import type { TPageable } from "@/types/api/api";

const donutsApiEnhanced = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: [ApiTags.Donuts],
	endpoints: {
		getDonuts: { providesTags: [ApiTags.Donuts] },
		postDonuts: { invalidatesTags: [ApiTags.Donuts] },
		getDonutsById: { providesTags: cacheByIdArgProperty(ApiTags.Donuts) },
	},
});

export const donutsApi = donutsApiEnhanced.injectEndpoints({
	endpoints: (build) => ({
		getDonutsFeed: build.infiniteQuery<TPageable<GetDonutsApiResponse>, GetDonutsApiArg, number>({
			infiniteQueryOptions: {
				initialPageParam: 1,
				getNextPageParam,
			},
			query: ({ queryArg, pageParam }) => ({
				url: "/donuts",
				params: {
					tenant: queryArg.tenant,
					all: queryArg.all,
					page: pageParam,
				},
			}),
			transformResponse: getTransformPageableResponse<TPageable<GetDonutsApiResponse>>(),
			providesTags: providesInfiniteList(ApiTags.Donuts),
		}),
	}),
	overrideExisting: false,
});

export const { useGetDonutsFeedInfiniteQuery } = donutsApi;
