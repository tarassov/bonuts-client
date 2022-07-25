import { emptySplitApi as api } from "./empty-api";
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getDonuts: build.query<GetDonutsApiResponse, GetDonutsApiArg>({
			query: (queryArg) => ({
				url: `/donuts`,
				params: { tenant: queryArg.tenant, all: queryArg.all },
			}),
		}),
		getEvents: build.query<GetEventsApiResponse, GetEventsApiArg>({
			query: (queryArg) => ({
				url: `/events`,
				params: {
					tenant: queryArg.tenant,
					showMine: queryArg.showMine,
					page: queryArg.page,
				},
			}),
		}),
		postInvitationsByIdAccept: build.mutation<
			PostInvitationsByIdAcceptApiResponse,
			PostInvitationsByIdAcceptApiArg
		>({
			query: (queryArg) => ({
				url: `/invitations/${queryArg.id}/accept`,
				method: "POST",
			}),
		}),
		postInvitations: build.mutation<
			PostInvitationsApiResponse,
			PostInvitationsApiArg
		>({
			query: (queryArg) => ({
				url: `/invitations`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		getProfiles: build.query<GetProfilesApiResponse, GetProfilesApiArg>({
			query: (queryArg) => ({
				url: `/profiles`,
				params: { tenant: queryArg.tenant },
			}),
		}),
		postTenantsByTenantNameJoin: build.mutation<
			PostTenantsByTenantNameJoinApiResponse,
			PostTenantsByTenantNameJoinApiArg
		>({
			query: (queryArg) => ({
				url: `/tenants/${queryArg.tenantName}/join`,
				method: "POST",
			}),
		}),
		postRegister: build.mutation<PostRegisterApiResponse, PostRegisterApiArg>({
			query: (queryArg) => ({
				url: `/register`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		postConfirmEmail: build.mutation<
			PostConfirmEmailApiResponse,
			PostConfirmEmailApiArg
		>({
			query: (queryArg) => ({
				url: `/confirm_email`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		postAuthenticate: build.mutation<
			PostAuthenticateApiResponse,
			PostAuthenticateApiArg
		>({
			query: (queryArg) => ({
				url: `/authenticate`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
	}),
	overrideExisting: false,
});
export { injectedRtkApi as bonutsApi };
export type GetDonutsApiResponse = /** status 200 success */ {
	data: {
		id: string;
		type: string;
		attributes: {
			name: string;
			price: number;
			id: number;
			active: boolean;
			logo: {
				url: string;
				thumb: {
					url: string;
				};
			};
			description: string;
			liked: boolean;
			likes: number;
			has_remains: boolean;
			on_stock: number;
			supply_days: number;
			expiration_date: string;
			created_at: string;
			comments: {
				id: number;
				content: string;
				likes: any[];
				public: boolean;
				user_avatar: {
					url: string;
					thumb: {
						url: string;
					};
					preview: {
						url: string;
					};
				};
				user_name: string;
				date_string: string;
			}[];
		};
	}[];
};
export type GetDonutsApiArg = {
	tenant?: string;
	all?: string;
};
export type GetEventsApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			content: string;
			extra_content?: string;
			id: number;
			date_string: string;
			user_id: number;
			user_name: string;
			comments: null;
			comment_count?: number;
			user_avatar: {
				url: string;
				thumb: {
					url: string;
				};
				preview: {
					url: string;
				};
			};
			liked: boolean;
			likes: number;
			public: boolean;
		};
	}[];
};
export type GetEventsApiArg = {
	tenant?: string;
	showMine?: string;
	page?: number;
};
export type PostInvitationsByIdAcceptApiResponse = unknown;
export type PostInvitationsByIdAcceptApiArg = {
	id: string;
};
export type PostInvitationsApiResponse = unknown;
export type PostInvitationsApiArg = {
	body: {
		email: string;
		first_name: string;
		last_name: string;
		tenant?: string;
	};
};
export type GetProfilesApiResponse = unknown;
export type GetProfilesApiArg = {
	tenant?: string;
};
export type PostTenantsByTenantNameJoinApiResponse = unknown;
export type PostTenantsByTenantNameJoinApiArg = {
	tenantName: string;
};
export type PostRegisterApiResponse = unknown;
export type PostRegisterApiArg = {
	body: {
		email: string;
		first_name: string;
		last_name: string;
		password: string;
	};
};
export type PostConfirmEmailApiResponse = unknown;
export type PostConfirmEmailApiArg = {
	body: {
		token: string;
	};
};
export type PostAuthenticateApiResponse = unknown;
export type PostAuthenticateApiArg = {
	body: {
		email: string;
		password: string;
	};
};
export const {
	useGetDonutsQuery,
	useGetEventsQuery,
	usePostInvitationsByIdAcceptMutation,
	usePostInvitationsMutation,
	useGetProfilesQuery,
	usePostTenantsByTenantNameJoinMutation,
	usePostRegisterMutation,
	usePostConfirmEmailMutation,
	usePostAuthenticateMutation,
} = injectedRtkApi;
