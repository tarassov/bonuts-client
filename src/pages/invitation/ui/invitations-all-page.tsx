import { useCallback } from "react";
import { InView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { ArrowBack, GroupAddOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import { BntRoutes } from "@/shared/config/routes";
import { formatStringDate } from "@/shared/lib/date";

import { getInvitationInitials, type TInvitationPreview, type TInvitationStatusType } from "../model/invitation-list";
import { useInvitationsFeed } from "../model/use-invitations-feed";

import { InvitationPageRoot, InvitationPanel } from "./invitation-page.styles";
import styles from "./invitations-all-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { routesPath } from "@/routes/config/routes-path";
import { texts_a, texts_c, texts_e, texts_i, texts_l, texts_n, texts_s } from "@/services/localization/texts";

const invitationStatusClass: Record<TInvitationStatusType, string> = {
	accepted: styles.statusAccepted,
	closed: styles.statusClosed,
	declined: styles.statusDeclined,
	sent: styles.statusSent,
};

const InvitationItem = ({ invitation }: { invitation: TInvitationPreview }) => {
	const { t } = useBntTranslate();

	return (
		<article className={styles.invitationItem}>
			<div className={styles.avatar}>{getInvitationInitials(invitation) || "B"}</div>
			<div className={styles.identity}>
				<h2 className={styles.name}>{invitation.name}</h2>
				<p className={styles.email}>{invitation.email}</p>
				{invitation.sentByName && (
					<p className={styles.sender}>
						<span>{t(texts_a.author)}</span>
						<span>{invitation.sentByName}</span>
					</p>
				)}
			</div>
			<div className={styles.meta}>
				<span className={`${styles.status} ${invitationStatusClass[invitation.status.type]}`}>{t(invitation.status.text)}</span>
				{invitation.createdAt && (
					<span className={styles.date}>
						{t(texts_c.created)}
						{formatStringDate(invitation.createdAt)}
					</span>
				)}
			</div>
		</article>
	);
};

export function InvitationsAllPage() {
	const { t } = useBntTranslate();
	const { fetchNext, hasNext, invitations, isFetching, isLoading } = useInvitationsFeed();

	const handleInView = useCallback(
		(inView: boolean) => {
			if (inView && !isLoading) fetchNext();
		},
		[fetchNext, isLoading]
	);

	const hasInvitations = invitations.length > 0;

	return (
		<InvitationPageRoot>
			<div className={styles.page}>
				<Link className={styles.backLink} to={routesPath[BntRoutes.Invitations]}>
					<ArrowBack fontSize="small" />
					{t(texts_i.invite_teammate)}
				</Link>

				<InvitationPanel className={styles.panel}>
					<header className={styles.header}>
						<div className={styles.headerIcon}>
							<GroupAddOutlined />
						</div>
						<div>
							<h1 className={styles.title}>{t(texts_i.invitations, { capitalize: true })}</h1>
							<p className={styles.description}>{t(texts_a.add_colleague_to_team_invitation_description)}</p>
						</div>
					</header>

					<div className={styles.tableHeader}>
						<span>{t(texts_e.email_address)}</span>
						<span>{t(texts_s.status)}</span>
					</div>

					<div className={styles.list}>
						{invitations.map((invitation) => (
							<InvitationItem invitation={invitation} key={invitation.id} />
						))}
					</div>

					{isLoading && (
						<div className={styles.loader}>
							<CircularProgress size={28} />
							<span>{t(texts_l.loading)}</span>
						</div>
					)}

					{!isLoading && !hasInvitations && <p className={styles.emptyText}>{t(texts_n.no_invitations_yet)}</p>}

					{hasNext && hasInvitations && (
						<InView as="div" className={styles.loader} onChange={handleInView}>
							<CircularProgress size={28} />
							{isFetching && <span>{t(texts_l.loading)}</span>}
						</InView>
					)}
				</InvitationPanel>
			</div>
		</InvitationPageRoot>
	);
}
