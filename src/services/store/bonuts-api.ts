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
		putEventsById: build.mutation<
			PutEventsByIdApiResponse,
			PutEventsByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/events/${queryArg.id}`,
				method: "PUT",
				body: queryArg.body,
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
				liked?: boolean;
				likes: number;
				public: boolean;
				user_avatar: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
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
			extra_content?: string | null;
			id: number;
			date_string: string;
			user_id: number;
			user_name: string;
			comments: null;
			comment_count?: number;
			user_avatar: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			liked: boolean;
			likes: {
				id: number;
				profile_id: number;
				created_at?: string;
				likeable_type?: string;
				likeable_id?: number;
			}[];
			public: boolean;
		};
	}[];
};
export type GetEventsApiArg = {
	tenant?: string;
	showMine?: string;
	page?: number;
};
export type PutEventsByIdApiResponse = /** status 200 event liked */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			content: string;
			extra_content?: string | null;
			id: number;
			date_string: string;
			user_id: number;
			user_name: string;
			comments: null;
			comment_count?: number;
			user_avatar: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			liked: boolean;
			likes: {
				id: number;
				profile_id: number;
				created_at?: string;
				likeable_type?: string;
				likeable_id?: number;
			}[];
			public: boolean;
		};
	};
};
export type PutEventsByIdApiArg = {
	id: string;
	body: {
		like: boolean;
		tenant: string;
	};
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
export type PostAuthenticateApiResponse = /** status 200 success */ {
	tenants: {
		id: number;
		name: string;
		caption: string;
		active: boolean;
		created_at: string;
		updated_at: string;
		domain: string;
		demo: boolean;
		logo: {
			url: string;
			thumb: {
				url: string;
			};
		};
		welcome_points: number;
		welcome_donuts: number;
		email_notification: boolean;
		birthday_donuts: number;
		join_to_project_donuts: number;
		join_to_company_donuts: number;
		use_departments: boolean;
	}[];
	auth_token: string;
	current_tenant?: {
		id: number;
		name: string;
		caption: string;
		active: boolean;
		created_at: string;
		updated_at: string;
		domain: string;
		demo: boolean;
		logo: {
			url: string;
			thumb: {
				url: string;
			};
		};
		welcome_points: number;
		welcome_donuts: number;
		email_notification: boolean;
		birthday_donuts: number;
		join_to_project_donuts: number;
		join_to_company_donuts: number;
		use_departments: boolean;
	};
};
export type PostAuthenticateApiArg = {
	body: {
		email: string;
		password: string;
	};
};
export const {
	useGetDonutsQuery,
	useGetEventsQuery,
	usePutEventsByIdMutation,
	usePostInvitationsByIdAcceptMutation,
	usePostInvitationsMutation,
	useGetProfilesQuery,
	usePostTenantsByTenantNameJoinMutation,
	usePostRegisterMutation,
	usePostConfirmEmailMutation,
	usePostAuthenticateMutation,
} = injectedRtkApi;
