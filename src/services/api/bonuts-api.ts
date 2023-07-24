import { emptySplitApi as api } from "./empty-api";

const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		postAccountOperations: build.mutation<
			PostAccountOperationsApiResponse,
			PostAccountOperationsApiArg
		>({
			query: (queryArg) => ({ url: `/account_operations`, method: "POST", body: queryArg.body }),
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
				params: { tenant: queryArg.tenant, showMine: queryArg.showMine, page: queryArg.page },
			}),
		}),
		putEventsById: build.mutation<PutEventsByIdApiResponse, PutEventsByIdApiArg>({
			query: (queryArg) => ({ url: `/events/${queryArg.id}`, method: "PUT", body: queryArg.body }),
		}),
		postInvitationsByIdAccept: build.mutation<
			PostInvitationsByIdAcceptApiResponse,
			PostInvitationsByIdAcceptApiArg
		>({
			query: (queryArg) => ({ url: `/invitations/${queryArg.id}/accept`, method: "POST" }),
		}),
		postInvitations: build.mutation<PostInvitationsApiResponse, PostInvitationsApiArg>({
			query: (queryArg) => ({ url: `/invitations`, method: "POST", body: queryArg.body }),
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
		getProfiles: build.query<GetProfilesApiResponse, GetProfilesApiArg>({
			query: (queryArg) => ({ url: `/profiles`, params: { tenant: queryArg.tenant } }),
		}),
		getRequests: build.query<GetRequestsApiResponse, GetRequestsApiArg>({
			query: (queryArg) => ({
				url: `/requests`,
				params: {
					active: queryArg.active,
					archive: queryArg.archive,
					incoming: queryArg.incoming,
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
		postRegister: build.mutation<PostRegisterApiResponse, PostRegisterApiArg>({
			query: (queryArg) => ({ url: `/register`, method: "POST", body: queryArg.body }),
		}),
		postConfirmEmail: build.mutation<PostConfirmEmailApiResponse, PostConfirmEmailApiArg>({
			query: (queryArg) => ({ url: `/confirm_email`, method: "POST", body: queryArg.body }),
		}),
		postAuthenticate: build.mutation<PostAuthenticateApiResponse, PostAuthenticateApiArg>({
			query: (queryArg) => ({ url: `/authenticate`, method: "POST", body: queryArg.body }),
		}),
		postRefreshToken: build.mutation<PostRefreshTokenApiResponse, PostRefreshTokenApiArg>({
			query: () => ({ url: `/refresh_token`, method: "POST" }),
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
	}[];
};
export type GetCirclesByIdApiArg = {
	id: string;
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
				user_name: string;
				date_string: string;
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
				user_name: string;
				date_string: string;
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
				user_name: string;
				date_string: string;
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
			extra_content?: string | null;
			id: number;
			date_string: string;
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
			} | null;
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
export type GetProfilesApiResponse = /** status 200 success */ {
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
					user_name: string;
					date_string: string;
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
					user_name: string;
					date_string: string;
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
					user_name: string;
					date_string: string;
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
					user_name: string;
					date_string: string;
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
					user_name: string;
					date_string: string;
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
					user_name: string;
					date_string: string;
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
		birthday_points: number;
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
	}[];
	auth_token: string;
	username?: string | null;
	currentTenant?: (string | null) | null;
};
export type PostRefreshTokenApiArg = void;
export const {
	usePostAccountOperationsMutation,
	usePostAvatarsMutation,
	useGetCirclesQuery,
	usePostCirclesMutation,
	useGetCirclesByIdQuery,
	usePatchCirclesByIdMutation,
	useDeleteCirclesByIdMutation,
	useGetDonutsQuery,
	usePostDonutsMutation,
	useGetDonutsByIdQuery,
	usePutDonutsByIdMutation,
	useGetEventsQuery,
	usePutEventsByIdMutation,
	usePostInvitationsByIdAcceptMutation,
	usePostInvitationsMutation,
	useGetProfileQuery,
	useGetProfilesByIdQuery,
	usePutProfilesByIdMutation,
	useGetProfilesQuery,
	useGetRequestsQuery,
	usePostRequestsMutation,
	usePostRequestsActivateMutation,
	usePostRequestsRefundMutation,
	usePostRequestsRollbackMutation,
	usePostRequestsCloseMutation,
	usePostTenantsByTenantNameJoinMutation,
	usePostRegisterMutation,
	usePostConfirmEmailMutation,
	usePostAuthenticateMutation,
	usePostRefreshTokenMutation,
} = injectedRtkApi;
