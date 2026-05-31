import type { FC } from "react";
import { memo, useMemo } from "react";

import { formatStringDate } from "@/shared/lib/date";

import { InvitationPreviewItem } from "@/entities/invitation";

import { getInvitationLogoUrl } from "../model/user-invitations-page-helper";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_i, texts_v } from "@/services/localization/texts";
import type { TInvitation } from "@/types/model/inivtation";

interface IWelcomeInvitationItemProps {
	invitation: TInvitation;
	onView: VoidFunction;
}

const WelcomeInvitationItemComponent: FC<IWelcomeInvitationItemProps> = ({ invitation, onView }) => {
	const { t } = useBntTranslate();
	const logoUrl = getInvitationLogoUrl(invitation);
	const metaLines = useMemo(() => {
		const items = [invitation.name];

		if (invitation.sentByName) {
			items.push(`${t(texts_i.invited_by, { capitalize: true })}: ${invitation.sentByName}`);
		}

		return items.filter(Boolean);
	}, [invitation.name, invitation.sentByName, t]);

	return (
		<InvitationPreviewItem
			actionLabel={t(texts_v.view, { capitalize: true })}
			dateLabel={formatStringDate(invitation.sentAt, false, false)}
			logoAlt={invitation.caption}
			logoContent={logoUrl ? <img src={logoUrl} alt={invitation.caption} /> : invitation.caption.slice(0, 2).toUpperCase()}
			metaLines={metaLines}
			onAction={onView}
			title={invitation.caption}
		/>
	);
};

export const WelcomeInvitationItem = memo(WelcomeInvitationItemComponent);
