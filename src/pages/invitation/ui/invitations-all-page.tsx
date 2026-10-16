import { useCallback } from "react";
import { InView } from "react-intersection-observer";
import { GroupAddOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import cn from "classnames";

import { formatStringDate } from "@/shared/lib/date";
import { BntStack } from "@/shared/ui/stack";

import { InvitationCopyLinkButton } from "@/entities/invitation";

import { getInvitationInitials, type TInvitationPreview, type TInvitationStatusType } from "../model/invitation-list";
import { useInvitationsFeed } from "../model/use-invitations-feed";

import { InvitationPanel } from "./invitation-page.styles";
import { InvitationPageShell } from "./invitation-page-shell";
import styles from "./invitations-all-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
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
				<BntStack direction="row" gap={1}>
					<span className={cn(styles.status, invitationStatusClass[invitation.status.type])}>{t(invitation.status.text)}</span>
					{invitation.status.type === "sent" && <InvitationCopyLinkButton invitationId={invitation.id} />}
				</BntStack>
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
		<InvitationPageShell variant="all">
			<div className={styles.page}>
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
		</InvitationPageShell>
	);
}
