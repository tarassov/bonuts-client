import type { TTenant } from "@/types/model/tenant";

export function getTenantInitials(tenant: TTenant) {
	const name = tenant.caption || tenant.name;

	return name
		.split(/\s+/)
		.map((part) => part[0] || "")
		.join("")
		.slice(0, 2);
}
