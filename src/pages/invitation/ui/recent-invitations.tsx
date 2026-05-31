import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

import { BntRoutes } from "@/shared/config/routes";
import { formatStringDate } from "@/shared/lib/date";
import { present } from "@/shared/lib/type-guards";
import { BntStack } from "@/shared/ui/stack";

import { InvitationCopyLinkButton } from "@/entities/invitation";

import { getInvitationInitials, mapInvitationPreview, type TInvitationStatusType } from "../model/invitation-list";

import { InvitationPanel } from "./invitation-page.styles";
import styles from "./recent-invitations.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useCurrentTenant } from "@/logic/hooks/tenant/use-current-tenant";
import { routesPath } from "@/routes/config/routes-path";
import { useGetInvitationsQuery } from "@/services/api/extended/invitations-api";
import { texts_l, texts_n, texts_r, texts_v } from "@/services/localization/texts";

const invitationStatusClass: Record<TInvitationStatusType, string> = {
	accepted: styles.statusAccepted,
	closed: styles.statusClosed,
	declined: styles.statusDeclined,
	sent: "",
};

export function RecentInvitations() {
	const { t } = useBntTranslate();
	const tenant = useCurrentTenant();
	const { data, isLoading } = useGetInvitationsQuery({ tenant: tenant || "", perPage: 2 }, { skip: !tenant });
	const invitations = mapInvitationPreview(data);

	return (
		<InvitationPanel className={styles.sidePanel}>
			<h2 className={styles.panelTitle}>{t(texts_r.recent_invitations)}</h2>
			<div className={styles.recentList}>
				{isLoading && <p className={styles.emptyText}>{t(texts_l.loading)}</p>}
				{!isLoading && present(invitations) && <p className={styles.emptyText}>{t(texts_n.no_invitations_yet)}</p>}
				{invitations.map((invitation) => (
					<div className={styles.recentItem} key={invitation.id}>
						<div className={styles.avatar}>{getInvitationInitials(invitation) || "B"}</div>
						<div>
							<p className={styles.recentName}>{invitation.name}</p>
							<p className={styles.recentCaption}>{invitation.email || invitation.caption}</p>
						</div>
						<div className={styles.recentMeta}>
							<BntStack direction="row" gap={1}>
								<span className={`${styles.status} ${invitationStatusClass[invitation.status.type]}`}>{t(invitation.status.text)}</span>
								{invitation.status.type === "sent" && <InvitationCopyLinkButton invitationId={invitation.id} />}
							</BntStack>
							{invitation.createdAt && <span className={styles.date}>{formatStringDate(invitation.createdAt)}</span>}
						</div>
					</div>
				))}
			</div>
			<Link className={styles.allLink} to={routesPath[BntRoutes.InvitationsAll]}>
				{t(texts_v.view_all_invitations)}
				<ArrowForward fontSize="small" />
			</Link>
		</InvitationPanel>
	);
}
