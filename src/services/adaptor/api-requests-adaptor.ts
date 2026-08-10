import type { GetRequestsApiResponse } from "@/services/api/bonuts-api";
import type { TPicture } from "@/types/model/picture";
import type { TRequest } from "@/types/model/request";

type TRequestApiItem = NonNullable<GetRequestsApiResponse["data"]>[number];

const mapPicture = (picture?: { url?: string | null; thumb?: { url?: string | null }; preview?: { url?: string | null } } | null): TPicture | undefined => {
	if (!picture) return undefined;

	return {
		url: picture.url ?? null,
		thumb: {
			url: picture.thumb?.url ?? null,
		},
		preview: {
			url: picture.preview?.url ?? picture.thumb?.url ?? null,
		},
	};
};

const mapFlatRequest = (target: TRequestApiItem): TRequest => {
	return {
		id: Number(target.id),
		name: target.name,
		public_uid: target.public_uid,
		donut_name: target.donut_name,
		created_at: target.created_at,
		updated_at: target.updated_at,
		status: target.status,
		date_used: target.date_used ?? null,
		deleted: target.deleted,
		enabled: Boolean(target.enabled),
		donut: target.donut
			? {
					...target.donut,
					id: Number(target.donut.id),
					logo: mapPicture(target.donut.logo),
					expiration_date: target.donut.expiration_date ?? null,
					use_remains: target.donut.use_remains,
				}
			: undefined,
		profile: target.profile
			? {
					id: Number(target.profile.id),
					active: target.profile.active,
					admin: target.profile.admin,
					bio: target.profile.bio || undefined,
					birthdate: target.profile.birthdate ?? null,
					circles: target.profile.circles,
					contact: target.profile.contact || undefined,
					created_at: target.profile.created_at,
					distrib_account: target.profile.distrib_account,
					email: target.profile.email,
					first_name: target.profile.first_name,
					in_date: target.profile.in_date ?? null,
					last_name: target.profile.last_name,
					last_seen_at: target.profile.last_seen_at,
					locale: target.profile.locale || undefined,
					name: target.profile.name,
					position: target.profile.position ?? null,
					roles: target.profile.roles,
					score_total: target.profile.score_total,
					self_account: target.profile.self_account,
					store_admin: target.profile.store_admin,
					tenant: target.profile.tenant,
					tg_code: target.profile.tg_code || undefined,
					user_id: target.profile.user_id,
					user_name: target.profile.name,
					user_avatar: mapPicture(target.profile.user_avatar),
				}
			: undefined,
	};
};

const mapLegacyRequest = (target: Record<string, unknown>): TRequest => {
	const attributes = target.attributes as TRequest | undefined;

	return {
		...attributes,
		enabled: Boolean(attributes?.enabled),
		id: Number(target.id),
		profile: attributes?.profile
			? {
					...attributes.profile,
					id: Number(attributes.profile.id),
					user_name: attributes.profile.user_name || attributes.profile.name,
				}
			: undefined,
	};
};

export const apiRequestsAdaptor = (response: GetRequestsApiResponse): Array<TRequest> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		if ("attributes" in target) {
			return mapLegacyRequest(target as Record<string, unknown>);
		}

		return mapFlatRequest(target);
	});
};
