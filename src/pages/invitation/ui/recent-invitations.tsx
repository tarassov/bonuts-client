import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { BntRoutes } from "@/shared/config/routes";
import { formatStringDate } from "@/shared/lib/date";

import { mapInvitationPreview, type TInvitationPreview, type TInvitationStatus } from "../model/invitation-list";

import styles from "./invitation-page.module.scss";
import { useCurrentTenant } from "logic/hooks/tenant/use-current-tenant";
import { routesPath } from "@/routes/config/routes-path";
import { useGetInvitationsQuery } from "@/services/api/extended/invitations-api";
import { texts_a, texts_c, texts_d, texts_l, texts_n, texts_r, texts_s, texts_v } from "@/services/localization/texts";

const invitationStatusText: Record<TInvitationStatus, string> = {
	accepted: texts_a.accepted,
	closed: texts_c.closed,
	declined: texts_d.declined,
	sent: texts_s.sent,
};

const invitationStatusClass: Record<TInvitationStatus, string> = {
	accepted: styles.statusAccepted,
	closed: styles.statusClosed,
	declined: styles.statusDeclined,
	sent: "",
};

const getInitials = (invitation: TInvitationPreview): string => {
	const source = invitation.name || invitation.email || invitation.caption || "";
	const words = source.split(" ").filter(Boolean);

	return words
		.slice(0, 2)
		.map((word) => word[0])
		.join("")
		.toUpperCase();
};

export function RecentInvitations() {
	const { t } = useBntTranslate();
	const tenant = useCurrentTenant();
	const { data, isLoading } = useGetInvitationsQuery({ tenant: tenant || "", perPage: 2 }, { skip: !tenant });
	const invitations = mapInvitationPreview(data);

	return (
		<section className={`${styles.panel} ${styles.sidePanel}`}>
			<h2 className={styles.panelTitle}>{t(texts_r.recent_invitations)}</h2>
			<div className={styles.recentList}>
				{isLoading && <p className={styles.emptyText}>{t(texts_l.loading)}</p>}
				{!isLoading && !invitations.length && <p className={styles.emptyText}>{t(texts_n.no_invitations_yet)}</p>}
				{invitations.map((invitation) => (
					<div className={styles.recentItem} key={invitation.id}>
						<div className={styles.avatar}>{getInitials(invitation) || "B"}</div>
						<div>
							<p className={styles.recentName}>{invitation.name}</p>
							<p className={styles.recentCaption}>{invitation.email || invitation.caption}</p>
						</div>
						<div className={styles.recentMeta}>
							<span className={`${styles.status} ${invitationStatusClass[invitation.status]}`}>{t(invitationStatusText[invitation.status])}</span>
							{invitation.createdAt && <span className={styles.date}>{formatStringDate(invitation.createdAt)}</span>}
						</div>
					</div>
				))}
			</div>
			<Link className={styles.allLink} to={routesPath[BntRoutes.InvitationsAll]}>
				{t(texts_v.view_all_invitations)}
				<ArrowForward fontSize="small" />
			</Link>
		</section>
	);
}
