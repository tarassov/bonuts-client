import { emptySplitApi as api } from "./empty-api";
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		postAccountOperations: build.mutation<
			PostAccountOperationsApiResponse,
			PostAccountOperationsApiArg
		>({
			query: (queryArg) => ({
				url: `/account_operations`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
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
		getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
			query: (queryArg) => ({
				url: `/profile`,
				params: { tenant: queryArg.tenant },
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
export type PostAccountOperationsApiResponse = unknown;
export type PostAccountOperationsApiArg = {
	body: {
		tenant: string;
		amount: number;
		from_profile_id?: string;
		to_profile_ids: string[];
		comment: string;
		share_for_all?: boolean;
		is_for_distrib?: boolean;
		burn_old?: boolean;
		to_self_account?: boolean;
	};
};
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
				url?: string | null;
				thumb?: {
					url?: string | null;
				};
			};
			description: string;
			liked: boolean;
			likes: {
				id: number;
				profile_id: number;
				created_at?: string;
				likeable_type?: string;
				likeable_id?: number;
			}[];
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
			comments_count: number;
			user_avatar: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			editable?: boolean;
			liked: boolean;
			likes: {
				id: number;
				profile_id: number;
				created_at?: string;
				likeable_type?: string;
				likeable_id?: number;
			}[];
			public: boolean;
			position: string;
			operation?: {
				id?: number;
				direction?: number;
				amount?: number;
				deal_type?: string;
				created_at?: string;
				to_user_name?: string;
				to_profile?: {
					id: number;
					user_name?: string;
					user_avatar?: {
						url: string | null;
						thumb: {
							url: string | null;
						};
						preview: {
							url: string | null;
						};
					};
					position?: string;
				};
			};
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
				comments_count: number;
				user_avatar: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				editable?: boolean;
				liked: boolean;
				likes: {
					id: number;
					profile_id: number;
					created_at?: string;
					likeable_type?: string;
					likeable_id?: number;
				}[];
				public: boolean;
				position: string;
				operation?: {
					id?: number;
					direction?: number;
					amount?: number;
					deal_type?: string;
					created_at?: string;
					to_user_name?: string;
					to_profile?: {
						id: number;
						user_name?: string;
						user_avatar?: {
							url: string | null;
							thumb: {
								url: string | null;
							};
							preview: {
								url: string | null;
							};
						};
						position?: string;
					};
				};
			};
		}[];
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
export type GetProfileApiResponse = unknown;
export type GetProfileApiArg = {
	tenant?: string;
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
		caption?: string | null;
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
		caption?: string | null;
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
	usePostAccountOperationsMutation,
	useGetDonutsQuery,
	useGetEventsQuery,
	usePutEventsByIdMutation,
	usePostInvitationsByIdAcceptMutation,
	usePostInvitationsMutation,
	useGetProfileQuery,
	useGetProfilesQuery,
	usePostTenantsByTenantNameJoinMutation,
	usePostRegisterMutation,
	usePostConfirmEmailMutation,
	usePostAuthenticateMutation,
} = injectedRtkApi;
