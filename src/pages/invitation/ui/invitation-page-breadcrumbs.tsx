import { useMemo } from "react";

import { BntRoutes } from "@/shared/config/routes";
import { useBntRoutes } from "@/shared/lib/router";
import { BntBreadcrumbs } from "@/shared/ui/breadcrumb";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";

import { texts_a } from "@/services/localization/texts";

type TInvitationPageBreadcrumbsVariant = "root" | "all";

interface IInvitationPageBreadcrumbsProps {
	variant: TInvitationPageBreadcrumbsVariant;
}

export function InvitationPageBreadcrumbs({ variant }: IInvitationPageBreadcrumbsProps) {
	const { routes } = useBntRoutes();

	const items = useMemo<Array<TBntBreadcrumbItem>>(() => {
		const invitationRoute = routes[BntRoutes.Invitations];
		const breadcrumbs: Array<TBntBreadcrumbItem> = [
			{
				key: "invitations",
				link: variant === "all" ? invitationRoute?.path : undefined,
				label: invitationRoute?.navbarName || "Invitations",
				icon: invitationRoute?.icon,
				noTranslation: !invitationRoute?.navbarName,
			},
		];

		if (variant === "all") {
			breadcrumbs.push({
				key: "all-invitations",
				label: texts_a.all_invitations,
			});
		}

		return breadcrumbs;
	}, [routes, variant]);

	return <BntBreadcrumbs items={items} />;
}
