import type { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { Lock, PushPinOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

import { ProfileAvatar } from "@/shared/ui/profile-avatar";

import { useEmployeeUi } from "@/entities/profile";

import { EventCardHeaderStyled } from "./event-card-header.styles";
import { PinnedBadge } from "./pinned-events-strip-styled";
import { Dictionary } from "@/constants/dictionary";
import { texts_n, texts_p } from "@/services/localization/texts";
import type { TPost } from "@/types/model/post";

export function EventCardHeader({ post }: { post: TPost }) {
	const { profile, public: isPublic, title, pinned } = post;
	const { user_name, user_avatar, position } = profile;
	const { t } = useTranslation();
	const { showEmployeeModal } = useEmployeeUi();
	const isNotification = !isPublic;
	const isPinned = Boolean(pinned) && isPublic;

	const handleOpenProfile = () => {
		if (!isPublic) return;

		showEmployeeModal(profile.id);
	};
	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleOpenProfile();
		}
	};

	return (
		<EventCardHeaderStyled
			notification={isNotification}
			isClickable={isPublic}
			onClick={isPublic ? handleOpenProfile : undefined}
			role={isPublic ? "button" : undefined}
			tabIndex={isPublic ? 0 : undefined}
			onKeyDown={isPublic ? handleKeyDown : undefined}
			avatar={isPublic ? <ProfileAvatar avatarUrl={user_avatar?.thumb?.url} name={user_name} hasOnlineBadge isOnline={Boolean(profile.is_online)} /> : undefined}
			action={
				isNotification ? (
					<Tooltip title={t(Dictionary.ONLY_YOU_CAN_SEE_IT)}>
						<IconButton aria-label={t(Dictionary.ONLY_YOU_CAN_SEE_IT) || Dictionary.ONLY_YOU_CAN_SEE_IT}>
							<Lock />
						</IconButton>
					</Tooltip>
				) : isPinned ? (
					<PinnedBadge data-testid="event-card-pinned-badge">
						<PushPinOutlined />
						{t(texts_p.pinned, { capitalize: true })}
					</PinnedBadge>
				) : null
			}
			title={isNotification ? t(texts_n.notification, { capitalize: true }) : title}
			subheader={isPublic && position}
		/>
	);
}
