import { ApiTags } from "@/shared/api";
import { cacheByIdArgProperty, getNextPageParam, getTransformPageableResponse, providesInfiniteList } from "@/shared/lib/rtk";

import type { GetDonutsApiArg, GetDonutsApiResponse } from "@/services/api/bonuts-api";
import { bonutsApiOverride } from "@/services/api/injected-api";
import type { TPageable } from "@/types/api/api";

const donutsApiEnhanced = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: [ApiTags.Donuts],
	endpoints: {
		createDonut: { invalidatesTags: [ApiTags.Donuts] },
		getDonuts: { providesTags: [ApiTags.Donuts] },
		postDonuts: { invalidatesTags: [ApiTags.Donuts] },
		getDonutsById: { providesTags: cacheByIdArgProperty(ApiTags.Donuts) },
		putDonutsById: { invalidatesTags: [ApiTags.Donuts] },
		updateDonut: { invalidatesTags: [ApiTags.Donuts] },
	},
});

export const donutsApi = donutsApiEnhanced.injectEndpoints({
	endpoints: (build) => ({
		getDonutsFeed: build.infiniteQuery<TPageable<GetDonutsApiResponse>, Omit<GetDonutsApiArg, "page">, number>({
			infiniteQueryOptions: {
				initialPageParam: 1,
				getNextPageParam,
			},
			query: ({ queryArg, pageParam }) => ({
				url: "/donuts",
				params: {
					tenant: queryArg.tenant,
					all: queryArg.all,
					search_text: queryArg.searchText,
					sort: queryArg.sort,
					page: pageParam,
					per_page: queryArg.perPage,
				},
			}),
			transformResponse: getTransformPageableResponse<TPageable<GetDonutsApiResponse>>(),
			providesTags: providesInfiniteList(ApiTags.Donuts),
		}),
	}),
	overrideExisting: false,
});

export const { useGetDonutsFeedInfiniteQuery } = donutsApi;
