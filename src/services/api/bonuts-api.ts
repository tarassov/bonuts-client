import { emptySplitApi as api } from "./empty-api";
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		postAccountOperations: build.mutation<
			PostAccountOperationsApiResponse,
			PostAccountOperationsApiArg
		>({
			query: (queryArg) => ({ url: `/account_operations`, method: "POST", body: queryArg.body }),
		}),
		getAccountOperations: build.query<GetAccountOperationsApiResponse, GetAccountOperationsApiArg>({
			query: (queryArg) => ({
				url: `/account_operations`,
				params: { tenant: queryArg.tenant, account_id: queryArg.accountId, page: queryArg.page },
			}),
		}),
		getAccountsById: build.query<GetAccountsByIdApiResponse, GetAccountsByIdApiArg>({
			query: (queryArg) => ({
				url: `/accounts/${queryArg.id}`,
				params: { tenant: queryArg.tenant },
			}),
		}),
		postAdminDeposit: build.mutation<PostAdminDepositApiResponse, PostAdminDepositApiArg>({
			query: (queryArg) => ({ url: `/admin_deposit`, method: "POST", body: queryArg.body }),
		}),
		postAvatars: build.mutation<PostAvatarsApiResponse, PostAvatarsApiArg>({
			query: (queryArg) => ({ url: `/avatars`, method: "POST", body: queryArg.body }),
		}),
		getCircles: build.query<GetCirclesApiResponse, GetCirclesApiArg>({
			query: (queryArg) => ({ url: `/circles`, params: { tenant: queryArg.tenant } }),
		}),
		postCircles: build.mutation<PostCirclesApiResponse, PostCirclesApiArg>({
			query: (queryArg) => ({ url: `/circles`, method: "POST", body: queryArg.body }),
		}),
		getCirclesById: build.query<GetCirclesByIdApiResponse, GetCirclesByIdApiArg>({
			query: (queryArg) => ({
				url: `/circles/${queryArg.id}`,
				params: { tenant: queryArg.tenant },
			}),
		}),
		patchCirclesById: build.mutation<PatchCirclesByIdApiResponse, PatchCirclesByIdApiArg>({
			query: (queryArg) => ({
				url: `/circles/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.body,
			}),
		}),
		deleteCirclesById: build.mutation<DeleteCirclesByIdApiResponse, DeleteCirclesByIdApiArg>({
			query: (queryArg) => ({
				url: `/circles/${queryArg.id}`,
				method: "DELETE",
				params: { tenant: queryArg.tenant },
			}),
		}),
		getDonutsSchedulers: build.query<GetDonutsSchedulersApiResponse, GetDonutsSchedulersApiArg>({
			query: (queryArg) => ({ url: `/donuts_schedulers`, params: { tenant: queryArg.tenant } }),
		}),
		postDonutsSchedulers: build.mutation<
			PostDonutsSchedulersApiResponse,
			PostDonutsSchedulersApiArg
		>({
			query: (queryArg) => ({ url: `/donuts_schedulers`, method: "POST", body: queryArg.body }),
		}),
		getDonutsSchedulersById: build.query<
			GetDonutsSchedulersByIdApiResponse,
			GetDonutsSchedulersByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/donuts_schedulers/${queryArg.id}`,
				params: { tenant: queryArg.tenant },
			}),
		}),
		patchDonutsSchedulersById: build.mutation<
			PatchDonutsSchedulersByIdApiResponse,
			PatchDonutsSchedulersByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/donuts_schedulers/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.body,
			}),
		}),
		deleteDonutsSchedulersById: build.mutation<
			DeleteDonutsSchedulersByIdApiResponse,
			DeleteDonutsSchedulersByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/donuts_schedulers/${queryArg.id}`,
				method: "DELETE",
				params: { tenant: queryArg.tenant },
			}),
		}),
		getDonuts: build.query<GetDonutsApiResponse, GetDonutsApiArg>({
			query: (queryArg) => ({
				url: `/donuts`,
				params: { tenant: queryArg.tenant, all: queryArg.all },
			}),
		}),
		postDonuts: build.mutation<PostDonutsApiResponse, PostDonutsApiArg>({
			query: (queryArg) => ({ url: `/donuts`, method: "POST", body: queryArg.body }),
		}),
		getDonutsById: build.query<GetDonutsByIdApiResponse, GetDonutsByIdApiArg>({
			query: (queryArg) => ({ url: `/donuts/${queryArg.id}`, params: { tenant: queryArg.tenant } }),
		}),
		putDonutsById: build.mutation<PutDonutsByIdApiResponse, PutDonutsByIdApiArg>({
			query: (queryArg) => ({ url: `/donuts/${queryArg.id}`, method: "PUT", body: queryArg.body }),
		}),
		getEvents: build.query<GetEventsApiResponse, GetEventsApiArg>({
			query: (queryArg) => ({
				url: `/events`,
				params: {
					tenant: queryArg.tenant,
					showMine: queryArg.showMine,
					searchText: queryArg.searchText,
					page: queryArg.page,
				},
			}),
		}),
		getEventsById: build.query<GetEventsByIdApiResponse, GetEventsByIdApiArg>({
			query: (queryArg) => ({ url: `/events/${queryArg.id}`, params: { tenant: queryArg.tenant } }),
		}),
		putEventsById: build.mutation<PutEventsByIdApiResponse, PutEventsByIdApiArg>({
			query: (queryArg) => ({ url: `/events/${queryArg.id}`, method: "PUT", body: queryArg.body }),
		}),
		postEventsByIdComments: build.mutation<
			PostEventsByIdCommentsApiResponse,
			PostEventsByIdCommentsApiArg
		>({
			query: (queryArg) => ({
				url: `/events/${queryArg.id}/comments`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		postInvitationsByIdAccept: build.mutation<
			PostInvitationsByIdAcceptApiResponse,
			PostInvitationsByIdAcceptApiArg
		>({
			query: (queryArg) => ({ url: `/invitations/${queryArg.id}/accept`, method: "POST" }),
		}),
		postInvitationsByIdDecline: build.mutation<
			PostInvitationsByIdDeclineApiResponse,
			PostInvitationsByIdDeclineApiArg
		>({
			query: (queryArg) => ({ url: `/invitations/${queryArg.id}/decline`, method: "POST" }),
		}),
		postInvitations: build.mutation<PostInvitationsApiResponse, PostInvitationsApiArg>({
			query: (queryArg) => ({ url: `/invitations`, method: "POST", body: queryArg.body }),
		}),
		getInvitationsMy: build.query<GetInvitationsMyApiResponse, GetInvitationsMyApiArg>({
			query: () => ({ url: `/invitations/my` }),
		}),
		getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
			query: (queryArg) => ({ url: `/profile`, params: { tenant: queryArg.tenant } }),
		}),
		getProfilesById: build.query<GetProfilesByIdApiResponse, GetProfilesByIdApiArg>({
			query: (queryArg) => ({
				url: `/profiles/${queryArg.id}`,
				params: { tenant: queryArg.tenant },
			}),
		}),
		putProfilesById: build.mutation<PutProfilesByIdApiResponse, PutProfilesByIdApiArg>({
			query: (queryArg) => ({
				url: `/profiles/${queryArg.id}`,
				method: "PUT",
				body: queryArg.body,
			}),
		}),
		postProfilesByIdSetActivity: build.mutation<
			PostProfilesByIdSetActivityApiResponse,
			PostProfilesByIdSetActivityApiArg
		>({
			query: (queryArg) => ({
				url: `/profiles/${queryArg.id}/set_activity`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		getProfiles: build.query<GetProfilesApiResponse, GetProfilesApiArg>({
			query: (queryArg) => ({
				url: `/profiles`,
				params: {
					tenant: queryArg.tenant,
					show_balance: queryArg.showBalance,
					show_score: queryArg.showScore,
					show_sent: queryArg.showSent,
					search_text: queryArg.searchText,
				},
			}),
		}),
		getReportsProfiles: build.query<GetReportsProfilesApiResponse, GetReportsProfilesApiArg>({
			query: (queryArg) => ({
				url: `/reports/profiles`,
				params: {
					tenant: queryArg.tenant,
					report_type: queryArg.reportType,
					date_from: queryArg.dateFrom,
					date_to: queryArg.dateTo,
					search_text: queryArg.searchText,
				},
			}),
		}),
		getRequests: build.query<GetRequestsApiResponse, GetRequestsApiArg>({
			query: (queryArg) => ({
				url: `/requests`,
				params: {
					active: queryArg.active,
					archive: queryArg.archive,
					incoming: queryArg.incoming,
					my: queryArg.my,
					tenant: queryArg.tenant,
				},
			}),
		}),
		postRequests: build.mutation<PostRequestsApiResponse, PostRequestsApiArg>({
			query: (queryArg) => ({ url: `/requests`, method: "POST", body: queryArg.body }),
		}),
		postRequestsActivate: build.mutation<
			PostRequestsActivateApiResponse,
			PostRequestsActivateApiArg
		>({
			query: (queryArg) => ({ url: `/requests/activate`, method: "POST", body: queryArg.body }),
		}),
		postRequestsRefund: build.mutation<PostRequestsRefundApiResponse, PostRequestsRefundApiArg>({
			query: (queryArg) => ({ url: `/requests/refund`, method: "POST", body: queryArg.body }),
		}),
		postRequestsRollback: build.mutation<
			PostRequestsRollbackApiResponse,
			PostRequestsRollbackApiArg
		>({
			query: (queryArg) => ({ url: `/requests/rollback`, method: "POST", body: queryArg.body }),
		}),
		postRequestsClose: build.mutation<PostRequestsCloseApiResponse, PostRequestsCloseApiArg>({
			query: (queryArg) => ({ url: `/requests/close`, method: "POST", body: queryArg.body }),
		}),
		postTenantsByTenantNameJoin: build.mutation<
			PostTenantsByTenantNameJoinApiResponse,
			PostTenantsByTenantNameJoinApiArg
		>({
			query: (queryArg) => ({ url: `/tenants/${queryArg.tenantName}/join`, method: "POST" }),
		}),
		getTenantCurrent: build.query<GetTenantCurrentApiResponse, GetTenantCurrentApiArg>({
			query: (queryArg) => ({ url: `/tenant/current`, params: { tenant: queryArg.tenant } }),
		}),
		putTenantCurrent: build.mutation<PutTenantCurrentApiResponse, PutTenantCurrentApiArg>({
			query: (queryArg) => ({ url: `/tenant/current`, method: "PUT", body: queryArg.body }),
		}),
		getTenantsAccessible: build.query<GetTenantsAccessibleApiResponse, GetTenantsAccessibleApiArg>({
			query: () => ({ url: `/tenants/accessible` }),
		}),
		getTenants: build.query<GetTenantsApiResponse, GetTenantsApiArg>({
			query: () => ({ url: `/tenants` }),
		}),
		getTies: build.query<GetTiesApiResponse, GetTiesApiArg>({
			query: (queryArg) => ({
				url: `/ties`,
				params: { tenant: queryArg.tenant, date_from: queryArg.dateFrom, date_to: queryArg.dateTo },
			}),
		}),
		postRegister: build.mutation<PostRegisterApiResponse, PostRegisterApiArg>({
			query: (queryArg) => ({ url: `/register`, method: "POST", body: queryArg.body }),
		}),
		postConfirmEmail: build.mutation<PostConfirmEmailApiResponse, PostConfirmEmailApiArg>({
			query: (queryArg) => ({ url: `/confirm_email`, method: "POST", body: queryArg.body }),
		}),
		getConfirmEmail: build.query<GetConfirmEmailApiResponse, GetConfirmEmailApiArg>({
			query: (queryArg) => ({ url: `/confirm_email`, params: { token: queryArg.token } }),
		}),
		postDemoAuthenticate: build.mutation<
			PostDemoAuthenticateApiResponse,
			PostDemoAuthenticateApiArg
		>({
			query: () => ({ url: `/demo_authenticate`, method: "POST" }),
		}),
		postAuthenticate: build.mutation<PostAuthenticateApiResponse, PostAuthenticateApiArg>({
			query: (queryArg) => ({ url: `/authenticate`, method: "POST", body: queryArg.body }),
		}),
		postLogout: build.mutation<PostLogoutApiResponse, PostLogoutApiArg>({
			query: () => ({ url: `/logout`, method: "POST" }),
		}),
		postSendConfirmEmail: build.mutation<
			PostSendConfirmEmailApiResponse,
			PostSendConfirmEmailApiArg
		>({
			query: (queryArg) => ({ url: `/send_confirm_email`, method: "POST", body: queryArg.body }),
		}),
		postRefreshToken: build.mutation<PostRefreshTokenApiResponse, PostRefreshTokenApiArg>({
			query: () => ({ url: `/refresh_token`, method: "POST" }),
		}),
		getUsersRecover: build.query<GetUsersRecoverApiResponse, GetUsersRecoverApiArg>({
			query: (queryArg) => ({
				url: `/users/recover`,
				params: { recover_token: queryArg.recoverToken },
			}),
		}),
		putUsersPassword: build.mutation<PutUsersPasswordApiResponse, PutUsersPasswordApiArg>({
			query: (queryArg) => ({ url: `/users/password`, method: "PUT", body: queryArg.body }),
		}),
		postUsersPassword: build.mutation<PostUsersPasswordApiResponse, PostUsersPasswordApiArg>({
			query: (queryArg) => ({ url: `/users/password`, method: "POST", body: queryArg.body }),
		}),
	}),
	overrideExisting: false,
});
export { injectedRtkApi as bonutsApi };
export type PostAccountOperationsApiResponse = /** status 201 success */ {
	error?: boolean;
	message?: string;
	errorText?: string;
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			amount: any;
			parent_operation_id?: (number | null) | null;
			direction: number;
			comment?: (string | null) | null;
			deal_id?: number;
			created_at: string;
			created_at_utc: string;
			updated_at?: string;
		};
	}[];
};
export type PostAccountOperationsApiArg = {
	body: {
		tenant: string;
		amount: number;
		from_profile_id?: number;
		to_profile_ids: number[];
		comment: string;
		share_for_all?: boolean;
		is_for_distrib?: boolean;
		burn_old?: boolean;
		to_self_account?: boolean;
	};
};
export type GetAccountOperationsApiResponse = /** status 200 success */ {
	error?: boolean;
	message?: string;
	errorText?: string;
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			amount: any;
			parent_operation_id?: (number | null) | null;
			direction: number;
			comment?: (string | null) | null;
			deal_id?: number;
			created_at: string;
			created_at_utc: string;
			updated_at?: string;
		};
	}[];
};
export type GetAccountOperationsApiArg = {
	tenant?: string;
	accountId?: string;
	page?: number;
};
export type GetAccountsByIdApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			balance: number;
			type?: string;
			last_operation?: {
				amount?: number;
				date?: string;
				date_utc?: string;
				direction?: "+" | "-";
			};
		};
	};
};
export type GetAccountsByIdApiArg = {
	id: number;
	tenant: string;
};
export type PostAdminDepositApiResponse = /** status 200 success */ {
	error?: boolean;
	message?: string;
	errorText?: string;
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			amount: any;
			parent_operation_id?: (number | null) | null;
			direction: number;
			comment?: (string | null) | null;
			deal_id?: number;
			created_at: string;
			created_at_utc: string;
			updated_at?: string;
		};
	}[];
};
export type PostAdminDepositApiArg = {
	body: {
		tenant: string;
		amount: number;
		/** Recipient's account type distrib or self */
		account_type?: "self" | "distrib";
		to_profile_ids: number[];
		comment: string;
	};
};
export type PostAvatarsApiResponse = /** status 200 success */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id: number;
			default?: boolean;
			user_id: number;
			active: boolean;
			admin: boolean;
			attached?: boolean;
			roles: string[];
			circles: {
				name: string;
				id: number;
				active: boolean;
			}[];
			department?: (object | null) | null;
			position?: (string | null) | null;
			store_admin?: boolean;
			bot?: boolean;
			first_name?: string;
			last_name?: string;
			name?: string;
			email: string;
			tenant?: string;
			sex?: string;
			phone?: (string | null) | null;
			contact: (string | null) | null;
			bio: (string | null) | null;
			birthdate: (string | null) | null;
			in_date: (string | null) | null;
			created_at?: string;
			user_avatar?: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			logo?: {
				url?: string | null;
				thumb?: {
					url?: string | null;
				};
			};
			score_total?: number;
			self_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
			distrib_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
		};
		relationships?: {
			user?: {
				data: {
					id: string;
					type: string;
				};
			};
		};
	};
	included?: {
		id: string;
		type: "user";
		attributes: {
			id: number;
			email: string;
			last_name: string;
			first_name: string;
			sex: string;
			notes?: (string | null) | null;
			email_confirmed: boolean;
			name: string;
		};
	}[];
};
export type PostAvatarsApiArg = {
	body: {
		id: number;
		tenant: string;
		uploaded_image: any;
	};
};
export type GetCirclesApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string;
			id: number;
			active: boolean;
		};
	}[];
};
export type GetCirclesApiArg = {
	tenant?: string;
};
export type PostCirclesApiResponse = /** status 201 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string;
			id: number;
			active: boolean;
		};
	}[];
};
export type PostCirclesApiArg = {
	body: {
		name: string;
		tenant: string;
	};
};
export type GetCirclesByIdApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string;
			id: number;
			active: boolean;
		};
	};
};
export type GetCirclesByIdApiArg = {
	id: number;
	tenant?: string;
};
export type PatchCirclesByIdApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string;
			id: number;
			active: boolean;
		};
	}[];
};
export type PatchCirclesByIdApiArg = {
	id: string;
	body: {
		name: string;
		tenant: string;
	};
};
export type DeleteCirclesByIdApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string;
			id: number;
			active: boolean;
		};
	}[];
};
export type DeleteCirclesByIdApiArg = {
	id: string;
	tenant?: string;
};
export type GetDonutsSchedulersApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string | null;
			comment?: string | null;
			id: number;
			active: boolean;
			day?: number | null;
			weekday?: number | null;
			burn_old?: boolean | null;
			every?: string;
			execute_time?: string | null;
			time_in_seconds?: number | null;
			timezone?: string | null;
			profile?: {
				id: number;
				default?: boolean;
				user_id: number;
				active: boolean;
				admin: boolean;
				attached?: boolean;
				roles: string[];
				circles: {
					name: string;
					id: number;
					active: boolean;
				}[];
				department?: (object | null) | null;
				position?: (string | null) | null;
				store_admin?: boolean;
				bot?: boolean;
				first_name?: string;
				last_name?: string;
				name?: string;
				email: string;
				tenant?: string;
				sex?: string;
				phone?: (string | null) | null;
				contact: (string | null) | null;
				bio: (string | null) | null;
				birthdate: (string | null) | null;
				in_date: (string | null) | null;
				created_at?: string;
				user_avatar?: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				logo?: {
					url?: string | null;
					thumb?: {
						url?: string | null;
					};
				};
				score_total?: number;
				self_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
				distrib_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
			};
		};
	}[];
};
export type GetDonutsSchedulersApiArg = {
	tenant?: string;
};
export type PostDonutsSchedulersApiResponse = /** status 201 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string | null;
			comment?: string | null;
			id: number;
			active: boolean;
			day?: number | null;
			weekday?: number | null;
			burn_old?: boolean | null;
			every?: string;
			execute_time?: string | null;
			time_in_seconds?: number | null;
			timezone?: string | null;
			profile?: {
				id: number;
				default?: boolean;
				user_id: number;
				active: boolean;
				admin: boolean;
				attached?: boolean;
				roles: string[];
				circles: {
					name: string;
					id: number;
					active: boolean;
				}[];
				department?: (object | null) | null;
				position?: (string | null) | null;
				store_admin?: boolean;
				bot?: boolean;
				first_name?: string;
				last_name?: string;
				name?: string;
				email: string;
				tenant?: string;
				sex?: string;
				phone?: (string | null) | null;
				contact: (string | null) | null;
				bio: (string | null) | null;
				birthdate: (string | null) | null;
				in_date: (string | null) | null;
				created_at?: string;
				user_avatar?: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				logo?: {
					url?: string | null;
					thumb?: {
						url?: string | null;
					};
				};
				score_total?: number;
				self_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
				distrib_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
			};
		};
	}[];
};
export type PostDonutsSchedulersApiArg = {
	body: {
		name: string;
		tenant: string;
		amount: number;
		every: string;
		comment: string;
		burn_old?: boolean;
		day?: number;
		weekday?: number;
		execute_time?: string;
		time_in_seconds?: number;
		timezone?: string;
	};
};
export type GetDonutsSchedulersByIdApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string | null;
			comment?: string | null;
			id: number;
			active: boolean;
			day?: number | null;
			weekday?: number | null;
			burn_old?: boolean | null;
			every?: string;
			execute_time?: string | null;
			time_in_seconds?: number | null;
			timezone?: string | null;
			profile?: {
				id: number;
				default?: boolean;
				user_id: number;
				active: boolean;
				admin: boolean;
				attached?: boolean;
				roles: string[];
				circles: {
					name: string;
					id: number;
					active: boolean;
				}[];
				department?: (object | null) | null;
				position?: (string | null) | null;
				store_admin?: boolean;
				bot?: boolean;
				first_name?: string;
				last_name?: string;
				name?: string;
				email: string;
				tenant?: string;
				sex?: string;
				phone?: (string | null) | null;
				contact: (string | null) | null;
				bio: (string | null) | null;
				birthdate: (string | null) | null;
				in_date: (string | null) | null;
				created_at?: string;
				user_avatar?: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				logo?: {
					url?: string | null;
					thumb?: {
						url?: string | null;
					};
				};
				score_total?: number;
				self_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
				distrib_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
			};
		};
	};
};
export type GetDonutsSchedulersByIdApiArg = {
	id: number;
	tenant?: string;
};
export type PatchDonutsSchedulersByIdApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string | null;
			comment?: string | null;
			id: number;
			active: boolean;
			day?: number | null;
			weekday?: number | null;
			burn_old?: boolean | null;
			every?: string;
			execute_time?: string | null;
			time_in_seconds?: number | null;
			timezone?: string | null;
			profile?: {
				id: number;
				default?: boolean;
				user_id: number;
				active: boolean;
				admin: boolean;
				attached?: boolean;
				roles: string[];
				circles: {
					name: string;
					id: number;
					active: boolean;
				}[];
				department?: (object | null) | null;
				position?: (string | null) | null;
				store_admin?: boolean;
				bot?: boolean;
				first_name?: string;
				last_name?: string;
				name?: string;
				email: string;
				tenant?: string;
				sex?: string;
				phone?: (string | null) | null;
				contact: (string | null) | null;
				bio: (string | null) | null;
				birthdate: (string | null) | null;
				in_date: (string | null) | null;
				created_at?: string;
				user_avatar?: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				logo?: {
					url?: string | null;
					thumb?: {
						url?: string | null;
					};
				};
				score_total?: number;
				self_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
				distrib_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
			};
		};
	}[];
};
export type PatchDonutsSchedulersByIdApiArg = {
	id: string;
	body: {
		name: string;
		tenant: string;
	};
};
export type DeleteDonutsSchedulersByIdApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string | null;
			comment?: string | null;
			id: number;
			active: boolean;
			day?: number | null;
			weekday?: number | null;
			burn_old?: boolean | null;
			every?: string;
			execute_time?: string | null;
			time_in_seconds?: number | null;
			timezone?: string | null;
			profile?: {
				id: number;
				default?: boolean;
				user_id: number;
				active: boolean;
				admin: boolean;
				attached?: boolean;
				roles: string[];
				circles: {
					name: string;
					id: number;
					active: boolean;
				}[];
				department?: (object | null) | null;
				position?: (string | null) | null;
				store_admin?: boolean;
				bot?: boolean;
				first_name?: string;
				last_name?: string;
				name?: string;
				email: string;
				tenant?: string;
				sex?: string;
				phone?: (string | null) | null;
				contact: (string | null) | null;
				bio: (string | null) | null;
				birthdate: (string | null) | null;
				in_date: (string | null) | null;
				created_at?: string;
				user_avatar?: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				logo?: {
					url?: string | null;
					thumb?: {
						url?: string | null;
					};
				};
				score_total?: number;
				self_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
				distrib_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
			};
		};
	}[];
};
export type DeleteDonutsSchedulersByIdApiArg = {
	id: string;
	tenant?: string;
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
				profile?: {
					id: number;
					name: string;
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
				};
				user_name: string;
				date_string: string;
				date_string_utc?: string;
			}[];
		};
	}[];
};
export type GetDonutsApiArg = {
	tenant?: string;
	all?: string;
};
export type PostDonutsApiResponse = /** status 200 success */ {
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
				profile?: {
					id: number;
					name: string;
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
				};
				user_name: string;
				date_string: string;
				date_string_utc?: string;
			}[];
		};
	}[];
};
export type PostDonutsApiArg = {
	body: {
		price: number;
		name: string;
		tenant: string;
		logo: any;
	};
};
export type GetDonutsByIdApiResponse = /** status 200 sends donut */ {
	data?: {
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
				profile?: {
					id: number;
					name: string;
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
				};
				user_name: string;
				date_string: string;
				date_string_utc?: string;
			}[];
		};
	};
};
export type GetDonutsByIdApiArg = {
	id: string;
	tenant?: string;
};
export type PutDonutsByIdApiResponse = /** status 200 success */ {
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
				profile?: {
					id: number;
					name: string;
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
				};
				user_name: string;
				date_string: string;
				date_string_utc?: string;
			}[];
		};
	}[];
};
export type PutDonutsByIdApiArg = {
	id: string;
	body: {
		price: number;
		on_stock?: number;
		supply_days?: number;
		active?: boolean;
		description?: string;
		expiration_date?: string;
		name: string;
		tenant: string;
		logo?: any;
	};
};
export type GetEventsApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			content: string;
			event_name: string | null;
			extra_content?: string | null;
			id: number;
			date_string: string;
			date_string_utc?: string;
			profile_id: number;
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
				profile?: {
					id: number;
					name: string;
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
				};
				user_name: string;
				date_string: string;
				date_string_utc?: string;
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
				id: number;
				direction?: number;
				amount?: number;
				deal_type?: string;
				created_at: string;
				created_at_utc?: string;
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
			} | null;
		};
	}[];
};
export type GetEventsApiArg = {
	tenant?: string;
	showMine?: string;
	searchText?: string;
	page?: number;
};
export type GetEventsByIdApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			content: string;
			event_name: string | null;
			extra_content?: string | null;
			id: number;
			date_string: string;
			date_string_utc?: string;
			profile_id: number;
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
				profile?: {
					id: number;
					name: string;
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
				};
				user_name: string;
				date_string: string;
				date_string_utc?: string;
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
				id: number;
				direction?: number;
				amount?: number;
				deal_type?: string;
				created_at: string;
				created_at_utc?: string;
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
			} | null;
		};
	};
};
export type GetEventsByIdApiArg = {
	id: string;
	tenant?: string;
};
export type PutEventsByIdApiResponse = /** status 200 event liked */ {
	data?: {
		data?: {
			id: string;
			type: string;
			attributes: {
				content: string;
				event_name: string | null;
				extra_content?: string | null;
				id: number;
				date_string: string;
				date_string_utc?: string;
				profile_id: number;
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
					profile?: {
						id: number;
						name: string;
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
					};
					user_name: string;
					date_string: string;
					date_string_utc?: string;
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
					id: number;
					direction?: number;
					amount?: number;
					deal_type?: string;
					created_at: string;
					created_at_utc?: string;
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
				} | null;
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
export type PostEventsByIdCommentsApiResponse = /** status 200 new comment created */ {
	data?: {
		data?: {
			id: string;
			type: string;
			attributes: {
				content: string;
				event_name: string | null;
				extra_content?: string | null;
				id: number;
				date_string: string;
				date_string_utc?: string;
				profile_id: number;
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
					profile?: {
						id: number;
						name: string;
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
					};
					user_name: string;
					date_string: string;
					date_string_utc?: string;
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
					id: number;
					direction?: number;
					amount?: number;
					deal_type?: string;
					created_at: string;
					created_at_utc?: string;
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
				} | null;
			};
		}[];
	};
};
export type PostEventsByIdCommentsApiArg = {
	id: string;
	body: {
		text: string;
		tenant: string;
	};
};
export type PostInvitationsByIdAcceptApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			default?: boolean;
			user_id: number;
			active: boolean;
			admin: boolean;
			attached?: boolean;
			roles: string[];
			circles: {
				name: string;
				id: number;
				active: boolean;
			}[];
			department?: (object | null) | null;
			position?: (string | null) | null;
			store_admin?: boolean;
			bot?: boolean;
			first_name?: string;
			last_name?: string;
			name?: string;
			email: string;
			tenant?: string;
			sex?: string;
			phone?: (string | null) | null;
			contact: (string | null) | null;
			bio: (string | null) | null;
			birthdate: (string | null) | null;
			in_date: (string | null) | null;
			created_at?: string;
			user_avatar?: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			logo?: {
				url?: string | null;
				thumb?: {
					url?: string | null;
				};
			};
			score_total?: number;
			self_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
			distrib_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
		};
	}[];
};
export type PostInvitationsByIdAcceptApiArg = {
	id: string;
};
export type PostInvitationsByIdDeclineApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string;
			caption: string;
			activated: boolean;
			closed: boolean;
			declined: boolean | null;
			logo?: {
				url: string;
				thumb: {
					url: string;
				};
			};
		};
	}[];
};
export type PostInvitationsByIdDeclineApiArg = {
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
export type GetInvitationsMyApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			name: string;
			caption: string;
			activated: boolean;
			closed: boolean;
			declined: boolean | null;
			logo?: {
				url: string;
				thumb: {
					url: string;
				};
			};
		};
	}[];
};
export type GetInvitationsMyApiArg = void;
export type GetProfileApiResponse = /** status 200 success */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id: number;
			default?: boolean;
			user_id: number;
			active: boolean;
			admin: boolean;
			attached?: boolean;
			roles: string[];
			circles: {
				name: string;
				id: number;
				active: boolean;
			}[];
			department?: (object | null) | null;
			position?: (string | null) | null;
			store_admin?: boolean;
			bot?: boolean;
			first_name?: string;
			last_name?: string;
			name?: string;
			email: string;
			tenant?: string;
			sex?: string;
			phone?: (string | null) | null;
			contact: (string | null) | null;
			bio: (string | null) | null;
			birthdate: (string | null) | null;
			in_date: (string | null) | null;
			created_at?: string;
			user_avatar?: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			logo?: {
				url?: string | null;
				thumb?: {
					url?: string | null;
				};
			};
			score_total?: number;
			self_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
			distrib_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
		};
		relationships?: {
			user?: {
				data: {
					id: string;
					type: string;
				};
			};
		};
	};
	included?: {
		id: string;
		type: "user";
		attributes: {
			id: number;
			email: string;
			last_name: string;
			first_name: string;
			sex: string;
			notes?: (string | null) | null;
			email_confirmed: boolean;
			name: string;
		};
	}[];
};
export type GetProfileApiArg = {
	tenant?: string;
};
export type GetProfilesByIdApiResponse = /** status 200 success */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id: number;
			default?: boolean;
			user_id: number;
			active: boolean;
			admin: boolean;
			attached?: boolean;
			roles: string[];
			circles: {
				name: string;
				id: number;
				active: boolean;
			}[];
			department?: (object | null) | null;
			position?: (string | null) | null;
			store_admin?: boolean;
			bot?: boolean;
			first_name?: string;
			last_name?: string;
			name?: string;
			email: string;
			tenant?: string;
			sex?: string;
			phone?: (string | null) | null;
			contact: (string | null) | null;
			bio: (string | null) | null;
			birthdate: (string | null) | null;
			in_date: (string | null) | null;
			created_at?: string;
			user_avatar?: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			logo?: {
				url?: string | null;
				thumb?: {
					url?: string | null;
				};
			};
			score_total?: number;
			self_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
			distrib_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
		};
		relationships?: {
			user?: {
				data: {
					id: string;
					type: string;
				};
			};
		};
	};
	included?: {
		id: string;
		type: "user";
		attributes: {
			id: number;
			email: string;
			last_name: string;
			first_name: string;
			sex: string;
			notes?: (string | null) | null;
			email_confirmed: boolean;
			name: string;
		};
	}[];
};
export type GetProfilesByIdApiArg = {
	id: string;
	tenant?: string;
};
export type PutProfilesByIdApiResponse = /** status 200 success */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id: number;
			default?: boolean;
			user_id: number;
			active: boolean;
			admin: boolean;
			attached?: boolean;
			roles: string[];
			circles: {
				name: string;
				id: number;
				active: boolean;
			}[];
			department?: (object | null) | null;
			position?: (string | null) | null;
			store_admin?: boolean;
			bot?: boolean;
			first_name?: string;
			last_name?: string;
			name?: string;
			email: string;
			tenant?: string;
			sex?: string;
			phone?: (string | null) | null;
			contact: (string | null) | null;
			bio: (string | null) | null;
			birthdate: (string | null) | null;
			in_date: (string | null) | null;
			created_at?: string;
			user_avatar?: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			logo?: {
				url?: string | null;
				thumb?: {
					url?: string | null;
				};
			};
			score_total?: number;
			self_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
			distrib_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
		};
		relationships?: {
			user?: {
				data: {
					id: string;
					type: string;
				};
			};
		};
	};
	included?: {
		id: string;
		type: "user";
		attributes: {
			id: number;
			email: string;
			last_name: string;
			first_name: string;
			sex: string;
			notes?: (string | null) | null;
			email_confirmed: boolean;
			name: string;
		};
	}[];
};
export type PutProfilesByIdApiArg = {
	id: string;
	body: {
		email?: string;
		first_name?: string;
		last_name?: string;
		department_id?: number | null;
		position?: string;
		admin?: boolean;
		active?: boolean;
		tenant?: string;
	};
};
export type PostProfilesByIdSetActivityApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			default?: boolean;
			user_id: number;
			active: boolean;
			admin: boolean;
			attached?: boolean;
			roles: string[];
			circles: {
				name: string;
				id: number;
				active: boolean;
			}[];
			department?: (object | null) | null;
			position?: (string | null) | null;
			store_admin?: boolean;
			bot?: boolean;
			first_name?: string;
			last_name?: string;
			name?: string;
			email: string;
			tenant?: string;
			sex?: string;
			phone?: (string | null) | null;
			contact: (string | null) | null;
			bio: (string | null) | null;
			birthdate: (string | null) | null;
			in_date: (string | null) | null;
			created_at?: string;
			user_avatar?: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			logo?: {
				url?: string | null;
				thumb?: {
					url?: string | null;
				};
			};
			score_total?: number;
			self_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
			distrib_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
		};
	}[];
};
export type PostProfilesByIdSetActivityApiArg = {
	id: number;
	body: {
		active?: boolean;
		tenant?: string;
	};
};
export type GetProfilesApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			default?: boolean;
			user_id: number;
			active: boolean;
			admin: boolean;
			attached?: boolean;
			roles: string[];
			circles: {
				name: string;
				id: number;
				active: boolean;
			}[];
			department?: (object | null) | null;
			position?: (string | null) | null;
			store_admin?: boolean;
			bot?: boolean;
			first_name?: string;
			last_name?: string;
			name?: string;
			email: string;
			tenant?: string;
			sex?: string;
			phone?: (string | null) | null;
			contact: (string | null) | null;
			bio: (string | null) | null;
			birthdate: (string | null) | null;
			in_date: (string | null) | null;
			created_at?: string;
			user_avatar?: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			logo?: {
				url?: string | null;
				thumb?: {
					url?: string | null;
				};
			};
			score_total?: number;
			self_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
			distrib_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
		};
	}[];
};
export type GetProfilesApiArg = {
	tenant?: string;
	showBalance?: boolean;
	showScore?: boolean;
	showSent?: boolean;
	searchText?: string;
};
export type GetReportsProfilesApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			default?: boolean;
			user_id: number;
			active: boolean;
			admin: boolean;
			attached?: boolean;
			roles: string[];
			circles: {
				name: string;
				id: number;
				active: boolean;
			}[];
			department?: (object | null) | null;
			position?: (string | null) | null;
			store_admin?: boolean;
			bot?: boolean;
			first_name?: string;
			last_name?: string;
			name?: string;
			email: string;
			tenant?: string;
			sex?: string;
			phone?: (string | null) | null;
			contact: (string | null) | null;
			bio: (string | null) | null;
			birthdate: (string | null) | null;
			in_date: (string | null) | null;
			created_at?: string;
			user_avatar?: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			logo?: {
				url?: string | null;
				thumb?: {
					url?: string | null;
				};
			};
			score_total?: number;
			self_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
			distrib_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
		};
	}[];
};
export type GetReportsProfilesApiArg = {
	tenant?: string;
	/** Value that will be displayed as reported  in score_total field */
	reportType?: "show_balance" | "show_score" | "show_sent";
	dateFrom?: string;
	/** Search string */
	dateTo?: string;
	searchText?: string;
};
export type GetRequestsApiResponse = /** status 200 success */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id: number;
			name: string;
			public_uid?: string;
			donut_name: string;
			created_at: string;
			updated_at: string;
			status: number;
			date_used?: (string | null) | null;
			deleted?: boolean;
			donut: {
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
					profile?: {
						id: number;
						name: string;
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
					};
					user_name: string;
					date_string: string;
					date_string_utc?: string;
				}[];
			};
			profile: {
				id: number;
				default?: boolean;
				user_id: number;
				active: boolean;
				admin: boolean;
				attached?: boolean;
				roles: string[];
				circles: {
					name: string;
					id: number;
					active: boolean;
				}[];
				department?: (object | null) | null;
				position?: (string | null) | null;
				store_admin?: boolean;
				bot?: boolean;
				first_name?: string;
				last_name?: string;
				name?: string;
				email: string;
				tenant?: string;
				sex?: string;
				phone?: (string | null) | null;
				contact: (string | null) | null;
				bio: (string | null) | null;
				birthdate: (string | null) | null;
				in_date: (string | null) | null;
				created_at?: string;
				user_avatar?: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				logo?: {
					url?: string | null;
					thumb?: {
						url?: string | null;
					};
				};
				score_total?: number;
				self_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
				distrib_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
			};
			enabled?: (boolean | null) | null;
		};
	}[];
};
export type GetRequestsApiArg = {
	active?: boolean;
	archive?: boolean;
	incoming?: boolean;
	my?: boolean;
	tenant?: string;
};
export type PostRequestsApiResponse = /** status 201 success */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id: number;
			name: string;
			public_uid?: string;
			donut_name: string;
			created_at: string;
			updated_at: string;
			status: number;
			date_used?: (string | null) | null;
			deleted?: boolean;
			donut: {
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
					profile?: {
						id: number;
						name: string;
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
					};
					user_name: string;
					date_string: string;
					date_string_utc?: string;
				}[];
			};
			profile: {
				id: number;
				default?: boolean;
				user_id: number;
				active: boolean;
				admin: boolean;
				attached?: boolean;
				roles: string[];
				circles: {
					name: string;
					id: number;
					active: boolean;
				}[];
				department?: (object | null) | null;
				position?: (string | null) | null;
				store_admin?: boolean;
				bot?: boolean;
				first_name?: string;
				last_name?: string;
				name?: string;
				email: string;
				tenant?: string;
				sex?: string;
				phone?: (string | null) | null;
				contact: (string | null) | null;
				bio: (string | null) | null;
				birthdate: (string | null) | null;
				in_date: (string | null) | null;
				created_at?: string;
				user_avatar?: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				logo?: {
					url?: string | null;
					thumb?: {
						url?: string | null;
					};
				};
				score_total?: number;
				self_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
				distrib_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
			};
			enabled?: (boolean | null) | null;
		};
	}[];
};
export type PostRequestsApiArg = {
	body: {
		donut_id?: number;
		tenant?: string;
	};
};
export type PostRequestsActivateApiResponse = /** status 200 success */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id: number;
			name: string;
			public_uid?: string;
			donut_name: string;
			created_at: string;
			updated_at: string;
			status: number;
			date_used?: (string | null) | null;
			deleted?: boolean;
			donut: {
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
					profile?: {
						id: number;
						name: string;
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
					};
					user_name: string;
					date_string: string;
					date_string_utc?: string;
				}[];
			};
			profile: {
				id: number;
				default?: boolean;
				user_id: number;
				active: boolean;
				admin: boolean;
				attached?: boolean;
				roles: string[];
				circles: {
					name: string;
					id: number;
					active: boolean;
				}[];
				department?: (object | null) | null;
				position?: (string | null) | null;
				store_admin?: boolean;
				bot?: boolean;
				first_name?: string;
				last_name?: string;
				name?: string;
				email: string;
				tenant?: string;
				sex?: string;
				phone?: (string | null) | null;
				contact: (string | null) | null;
				bio: (string | null) | null;
				birthdate: (string | null) | null;
				in_date: (string | null) | null;
				created_at?: string;
				user_avatar?: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				logo?: {
					url?: string | null;
					thumb?: {
						url?: string | null;
					};
				};
				score_total?: number;
				self_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
				distrib_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
			};
			enabled?: (boolean | null) | null;
		};
	}[];
};
export type PostRequestsActivateApiArg = {
	body: {
		id?: number;
		tenant?: string;
	};
};
export type PostRequestsRefundApiResponse = /** status 200 success */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id: number;
			name: string;
			public_uid?: string;
			donut_name: string;
			created_at: string;
			updated_at: string;
			status: number;
			date_used?: (string | null) | null;
			deleted?: boolean;
			donut: {
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
					profile?: {
						id: number;
						name: string;
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
					};
					user_name: string;
					date_string: string;
					date_string_utc?: string;
				}[];
			};
			profile: {
				id: number;
				default?: boolean;
				user_id: number;
				active: boolean;
				admin: boolean;
				attached?: boolean;
				roles: string[];
				circles: {
					name: string;
					id: number;
					active: boolean;
				}[];
				department?: (object | null) | null;
				position?: (string | null) | null;
				store_admin?: boolean;
				bot?: boolean;
				first_name?: string;
				last_name?: string;
				name?: string;
				email: string;
				tenant?: string;
				sex?: string;
				phone?: (string | null) | null;
				contact: (string | null) | null;
				bio: (string | null) | null;
				birthdate: (string | null) | null;
				in_date: (string | null) | null;
				created_at?: string;
				user_avatar?: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				logo?: {
					url?: string | null;
					thumb?: {
						url?: string | null;
					};
				};
				score_total?: number;
				self_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
				distrib_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
			};
			enabled?: (boolean | null) | null;
		};
	}[];
};
export type PostRequestsRefundApiArg = {
	body: {
		id?: number;
		tenant?: string;
	};
};
export type PostRequestsRollbackApiResponse = /** status 200 success */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id: number;
			name: string;
			public_uid?: string;
			donut_name: string;
			created_at: string;
			updated_at: string;
			status: number;
			date_used?: (string | null) | null;
			deleted?: boolean;
			donut: {
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
					profile?: {
						id: number;
						name: string;
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
					};
					user_name: string;
					date_string: string;
					date_string_utc?: string;
				}[];
			};
			profile: {
				id: number;
				default?: boolean;
				user_id: number;
				active: boolean;
				admin: boolean;
				attached?: boolean;
				roles: string[];
				circles: {
					name: string;
					id: number;
					active: boolean;
				}[];
				department?: (object | null) | null;
				position?: (string | null) | null;
				store_admin?: boolean;
				bot?: boolean;
				first_name?: string;
				last_name?: string;
				name?: string;
				email: string;
				tenant?: string;
				sex?: string;
				phone?: (string | null) | null;
				contact: (string | null) | null;
				bio: (string | null) | null;
				birthdate: (string | null) | null;
				in_date: (string | null) | null;
				created_at?: string;
				user_avatar?: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				logo?: {
					url?: string | null;
					thumb?: {
						url?: string | null;
					};
				};
				score_total?: number;
				self_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
				distrib_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
			};
			enabled?: (boolean | null) | null;
		};
	}[];
};
export type PostRequestsRollbackApiArg = {
	body: {
		id?: number;
		tenant?: string;
	};
};
export type PostRequestsCloseApiResponse = /** status 200 success */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id: number;
			name: string;
			public_uid?: string;
			donut_name: string;
			created_at: string;
			updated_at: string;
			status: number;
			date_used?: (string | null) | null;
			deleted?: boolean;
			donut: {
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
					profile?: {
						id: number;
						name: string;
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
					};
					user_name: string;
					date_string: string;
					date_string_utc?: string;
				}[];
			};
			profile: {
				id: number;
				default?: boolean;
				user_id: number;
				active: boolean;
				admin: boolean;
				attached?: boolean;
				roles: string[];
				circles: {
					name: string;
					id: number;
					active: boolean;
				}[];
				department?: (object | null) | null;
				position?: (string | null) | null;
				store_admin?: boolean;
				bot?: boolean;
				first_name?: string;
				last_name?: string;
				name?: string;
				email: string;
				tenant?: string;
				sex?: string;
				phone?: (string | null) | null;
				contact: (string | null) | null;
				bio: (string | null) | null;
				birthdate: (string | null) | null;
				in_date: (string | null) | null;
				created_at?: string;
				user_avatar?: {
					url: string | null;
					thumb: {
						url: string | null;
					};
					preview: {
						url: string | null;
					};
				};
				logo?: {
					url?: string | null;
					thumb?: {
						url?: string | null;
					};
				};
				score_total?: number;
				self_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
				distrib_account?: {
					id?: number;
					tenant_id?: number;
					profile_id?: number;
				};
			};
			enabled?: (boolean | null) | null;
		};
	}[];
};
export type PostRequestsCloseApiArg = {
	body: {
		id?: number;
		tenant?: string;
	};
};
export type PostTenantsByTenantNameJoinApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			default?: boolean;
			user_id: number;
			active: boolean;
			admin: boolean;
			attached?: boolean;
			roles: string[];
			circles: {
				name: string;
				id: number;
				active: boolean;
			}[];
			department?: (object | null) | null;
			position?: (string | null) | null;
			store_admin?: boolean;
			bot?: boolean;
			first_name?: string;
			last_name?: string;
			name?: string;
			email: string;
			tenant?: string;
			sex?: string;
			phone?: (string | null) | null;
			contact: (string | null) | null;
			bio: (string | null) | null;
			birthdate: (string | null) | null;
			in_date: (string | null) | null;
			created_at?: string;
			user_avatar?: {
				url: string | null;
				thumb: {
					url: string | null;
				};
				preview: {
					url: string | null;
				};
			};
			logo?: {
				url?: string | null;
				thumb?: {
					url?: string | null;
				};
			};
			score_total?: number;
			self_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
			distrib_account?: {
				id?: number;
				tenant_id?: number;
				profile_id?: number;
			};
		};
	}[];
};
export type PostTenantsByTenantNameJoinApiArg = {
	tenantName: string;
};
export type GetTenantCurrentApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			name: string;
			caption?: string | null;
			active: boolean;
			created_at: string;
			updated_at: string;
			domain: string;
			birthday_message?: string;
			demo: boolean;
			attached?: boolean | null;
			deactivated?: boolean | null;
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
			birthday_points: number;
			join_to_project_donuts: number;
			join_to_company_donuts: number;
			join_to_project_points: number;
			join_to_company_points: number;
			use_departments: boolean;
			test?: boolean;
		};
	};
};
export type GetTenantCurrentApiArg = {
	tenant?: string;
};
export type PutTenantCurrentApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			name: string;
			caption?: string | null;
			active: boolean;
			created_at: string;
			updated_at: string;
			domain: string;
			birthday_message?: string;
			demo: boolean;
			attached?: boolean | null;
			deactivated?: boolean | null;
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
			birthday_points: number;
			join_to_project_donuts: number;
			join_to_company_donuts: number;
			join_to_project_points: number;
			join_to_company_points: number;
			use_departments: boolean;
			test?: boolean;
		};
	};
};
export type PutTenantCurrentApiArg = {
	body: {
		id: number;
		name: string;
		tenant: string;
		caption?: string | null;
		active: boolean;
		created_at: string;
		updated_at: string;
		domain: string;
		demo: boolean;
		logo?: any;
		welcome_points: number;
		welcome_donuts: number;
		email_notification: boolean;
		birthday_donuts: number;
		birthday_points: number;
		birthday_message?: string | null;
		join_to_project_donuts: number;
		join_to_company_donuts: number;
		join_to_project_points: number;
		join_to_company_points: number;
		use_departments: boolean;
		test?: boolean;
	};
};
export type GetTenantsAccessibleApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			name: string;
			caption?: string | null;
			active: boolean;
			created_at: string;
			updated_at: string;
			domain: string;
			birthday_message?: string;
			demo: boolean;
			attached?: boolean | null;
			deactivated?: boolean | null;
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
			birthday_points: number;
			join_to_project_donuts: number;
			join_to_company_donuts: number;
			join_to_project_points: number;
			join_to_company_points: number;
			use_departments: boolean;
			test?: boolean;
		};
	}[];
};
export type GetTenantsAccessibleApiArg = void;
export type GetTenantsApiResponse = /** status 200 success */ {
	data?: {
		id: string;
		type: string;
		attributes: {
			id: number;
			name: string;
			caption?: string | null;
			active: boolean;
			created_at: string;
			updated_at: string;
			domain: string;
			birthday_message?: string;
			demo: boolean;
			attached?: boolean | null;
			deactivated?: boolean | null;
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
			birthday_points: number;
			join_to_project_donuts: number;
			join_to_company_donuts: number;
			join_to_project_points: number;
			join_to_company_points: number;
			use_departments: boolean;
			test?: boolean;
		};
	}[];
};
export type GetTenantsApiArg = void;
export type GetTiesApiResponse = /** status 200 success */ {
	from_id?: number;
	to_id?: number;
	id?: null;
}[];
export type GetTiesApiArg = {
	tenant?: string;
	dateFrom?: string;
	dateTo?: string;
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
export type PostConfirmEmailApiResponse = /** status 201 success */ {
	auth_token: string;
};
export type PostConfirmEmailApiArg = {
	body: {
		token: string;
	};
};
export type GetConfirmEmailApiResponse = /** status 200 receives user */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id?: number;
			type?: string;
			email?: string;
			last_name?: string;
			first_name?: string;
			sex?: string;
			note?: string;
			email_confirmed?: boolean;
			name?: string;
		};
	};
};
export type GetConfirmEmailApiArg = {
	token?: string;
};
export type PostDemoAuthenticateApiResponse = /** status 200 success */ {
	tenants: {
		id: number;
		name: string;
		caption?: string | null;
		active: boolean;
		created_at: string;
		updated_at: string;
		domain: string;
		demo: boolean;
		logo?: any;
		welcome_points: number;
		welcome_donuts: number;
		email_notification: boolean;
		birthday_donuts: number;
		birthday_points: number;
		birthday_message?: string;
		join_to_project_donuts: number;
		join_to_company_donuts: number;
		join_to_project_points: number;
		join_to_company_points: number;
		use_departments: boolean;
		test?: boolean;
	}[];
	auth_token: string;
	username?: string | null;
	currentTenant?: (string | null) | null;
};
export type PostDemoAuthenticateApiArg = void;
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
		logo?: any;
		welcome_points: number;
		welcome_donuts: number;
		email_notification: boolean;
		birthday_donuts: number;
		birthday_points: number;
		birthday_message?: string;
		join_to_project_donuts: number;
		join_to_company_donuts: number;
		join_to_project_points: number;
		join_to_company_points: number;
		use_departments: boolean;
		test?: boolean;
	}[];
	auth_token: string;
	username?: string | null;
	currentTenant?: (string | null) | null;
};
export type PostAuthenticateApiArg = {
	body: {
		email: string;
		password: string;
	};
};
export type PostLogoutApiResponse = unknown;
export type PostLogoutApiArg = void;
export type PostSendConfirmEmailApiResponse = /** status 200 not confirmed email */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: any;
	}[];
};
export type PostSendConfirmEmailApiArg = {
	body: {
		email: string;
	};
};
export type PostRefreshTokenApiResponse = /** status 200 success */ {
	tenants: {
		id: number;
		name: string;
		caption?: string | null;
		active: boolean;
		created_at: string;
		updated_at: string;
		domain: string;
		demo: boolean;
		logo?: any;
		welcome_points: number;
		welcome_donuts: number;
		email_notification: boolean;
		birthday_donuts: number;
		birthday_points: number;
		birthday_message?: string;
		join_to_project_donuts: number;
		join_to_company_donuts: number;
		join_to_project_points: number;
		join_to_company_points: number;
		use_departments: boolean;
		test?: boolean;
	}[];
	auth_token: string;
	username?: string | null;
	currentTenant?: (string | null) | null;
};
export type PostRefreshTokenApiArg = void;
export type GetUsersRecoverApiResponse = /** status 200 success */ {
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			id?: number;
			type?: string;
			email?: string;
			last_name?: string;
			first_name?: string;
			sex?: string;
			note?: string;
			email_confirmed?: boolean;
			name?: string;
		};
	};
};
export type GetUsersRecoverApiArg = {
	recoverToken?: string;
};
export type PutUsersPasswordApiResponse = /** status 200 success */ {
	email_sent: boolean;
};
export type PutUsersPasswordApiArg = {
	body: {
		email: string;
	};
};
export type PostUsersPasswordApiResponse = /** status 200 success */ {
	auth_token: string;
};
export type PostUsersPasswordApiArg = {
	body: {
		recover_token: string;
		password: string;
	};
};
export const {
	usePostAccountOperationsMutation,
	useGetAccountOperationsQuery,
	useGetAccountsByIdQuery,
	usePostAdminDepositMutation,
	usePostAvatarsMutation,
	useGetCirclesQuery,
	usePostCirclesMutation,
	useGetCirclesByIdQuery,
	usePatchCirclesByIdMutation,
	useDeleteCirclesByIdMutation,
	useGetDonutsSchedulersQuery,
	usePostDonutsSchedulersMutation,
	useGetDonutsSchedulersByIdQuery,
	usePatchDonutsSchedulersByIdMutation,
	useDeleteDonutsSchedulersByIdMutation,
	useGetDonutsQuery,
	usePostDonutsMutation,
	useGetDonutsByIdQuery,
	usePutDonutsByIdMutation,
	useGetEventsQuery,
	useGetEventsByIdQuery,
	usePutEventsByIdMutation,
	usePostEventsByIdCommentsMutation,
	usePostInvitationsByIdAcceptMutation,
	usePostInvitationsByIdDeclineMutation,
	usePostInvitationsMutation,
	useGetInvitationsMyQuery,
	useGetProfileQuery,
	useGetProfilesByIdQuery,
	usePutProfilesByIdMutation,
	usePostProfilesByIdSetActivityMutation,
	useGetProfilesQuery,
	useGetReportsProfilesQuery,
	useGetRequestsQuery,
	usePostRequestsMutation,
	usePostRequestsActivateMutation,
	usePostRequestsRefundMutation,
	usePostRequestsRollbackMutation,
	usePostRequestsCloseMutation,
	usePostTenantsByTenantNameJoinMutation,
	useGetTenantCurrentQuery,
	usePutTenantCurrentMutation,
	useGetTenantsAccessibleQuery,
	useGetTenantsQuery,
	useGetTiesQuery,
	usePostRegisterMutation,
	usePostConfirmEmailMutation,
	useGetConfirmEmailQuery,
	usePostDemoAuthenticateMutation,
	usePostAuthenticateMutation,
	usePostLogoutMutation,
	usePostSendConfirmEmailMutation,
	usePostRefreshTokenMutation,
	useGetUsersRecoverQuery,
	usePutUsersPasswordMutation,
	usePostUsersPasswordMutation,
} = injectedRtkApi;
