import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Comment, Edit, Favorite, Lock } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";

import classNames from "classnames";

import { UserLogic } from "@/shared/lib";
import { formatStringDate } from "@/shared/lib/date";
import { BntBox } from "@/shared/ui/box";
import { BntCard, BntCardActions, BntCardContent } from "@/shared/ui/card";
import { useNotification } from "@/shared/ui/notification";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntTypography } from "@/shared/ui/typography";

import { useEventLogic } from "../model/use-event-logic";

import { EVENT_CARD_CLASSES } from "./classes";
import { EventCardHeader } from "./event-card-header";
import { EventOperationText } from "./event-operation-text";
import { Dictionary } from "@/constants/dictionary";
import { useEmployeeUi } from "@/logic/ui/use-employee-ui";
import { useEventUi } from "@/logic/ui/use-event-ui";
import { texts_n } from "@/services/localization/texts";
import type { TPost } from "@/types/model/post";
import { emptyFunction } from "@/utils/empty-function";
import { focusInput } from "@/utils/focus-input";

export type EventCardProps = { post: TPost; className?: string; preventNewModal?: boolean };

export function EventCard({ post, className, preventNewModal }: EventCardProps) {
	const { profile, public: isPublic, title, content, commentable, likeable, comments_count, likes, liked, editable, date_string_utc } = post;
	const { user_name, user_avatar, position } = profile;
	const isUserOnline = UserLogic.isOnline(profile.last_seen_at);
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);
	const [edit, setEdit] = useState(false);
	const { toggleLike, updateEvent } = useEventLogic();
	const { showResponseError } = useNotification();
	const { showEmployeeModal } = useEmployeeUi();
	const { showDetailedPost } = useEventUi(post);
	const likesCount = likes.length;
	const commentsCount = comments_count || 0;
	const notification = !isPublic;
	const canOpenProfile = isPublic;

	const handleSubmitEdit = async (e: any) => {
		e.preventDefault();

		try {
			await updateEvent(post, { content: e.target.content.value });
			setEdit(false);
		} catch (error) {
			showResponseError(error);
		}
	};
	const handleLike = async () => {
		try {
			await toggleLike(post);
		} catch (error) {
			showResponseError(error);
		}
	};
	const handleComment = !preventNewModal ? showDetailedPost : emptyFunction;
	const handleHeaderClick = () => {
		if (!canOpenProfile) return;

		showEmployeeModal(profile.id);
	};
	const handleEdit = (e: any) => {
		e.preventDefault();
		setEdit(() => !edit);
	};

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (edit && inputRef?.current) {
			const timeout = setTimeout(() => {
				focusInput(inputRef.current);
			}, 100);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [edit]);

	return (
		<BntCard className={classNames(className, EVENT_CARD_CLASSES.cardRoot)} data-testid={notification ? "event-card-notification" : "event-card-public"}>
			<EventCardHeader
				notification={notification}
				isClickable={canOpenProfile}
				onClick={canOpenProfile ? handleHeaderClick : undefined}
				role={canOpenProfile ? "button" : undefined}
				tabIndex={canOpenProfile ? 0 : undefined}
				onKeyDown={
					canOpenProfile
						? (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleHeaderClick();
								}
							}
						: undefined
				}
				avatar={isPublic ? <ProfileAvatar avatarUrl={user_avatar?.thumb?.url} name={user_name} hasOnlineBadge isOnline={isUserOnline} /> : undefined}
				action={
					notification ? (
						<Tooltip title={t(Dictionary.ONLY_YOU_CAN_SEE_IT)}>
							<IconButton aria-label={t(Dictionary.ONLY_YOU_CAN_SEE_IT) || Dictionary.ONLY_YOU_CAN_SEE_IT}>
								<Lock />
							</IconButton>
						</Tooltip>
					) : null
				}
				title={notification ? t(texts_n.notification, { capitalize: true }) : title}
				subheader={isPublic && position}
			/>

			<BntCardContent className={EVENT_CARD_CLASSES.cardContent}>
				{post.operation && (
					<EventOperationText
						variant="event"
						operation={post.operation}
						onFromProfileClick={() => showEmployeeModal(post.operation?.from_profile?.id)}
						onToProfileClick={() => showEmployeeModal(post.operation?.to_profile?.id)}
					/>
				)}
				{!edit && (
					<BntTypography variant="body2" isPreformatted className={EVENT_CARD_CLASSES.cardBodyText}>
						{content}
					</BntTypography>
				)}
				{edit && (
					<Box component="form" onSubmit={handleSubmitEdit} className={EVENT_CARD_CLASSES.cardEditForm} noValidate autoComplete="off">
						<TextField
							autoFocus
							margin="dense"
							id="content_value"
							name="content"
							// onChange={handleContentChange}
							defaultValue={content}
							fullWidth
							///	onBlur={onBlur}
							multiline
							inputRef={inputRef}
						/>
						<Button type="submit" color="primary">
							{t("Submit")}
						</Button>
					</Box>
				)}
			</BntCardContent>

			{!notification ? (
				<BntCardActions disableSpacing className={EVENT_CARD_CLASSES.cardActions}>
					{likeable && (
						<BntBox className={EVENT_CARD_CLASSES.cardActionGroup}>
							<IconButton
								aria-label="Add to favorites"
								onClick={handleLike}
								className={classNames(EVENT_CARD_CLASSES.cardActionButton, {
									[EVENT_CARD_CLASSES.liked]: liked,
								})}
							>
								<Favorite />
							</IconButton>
							<BntBox className={EVENT_CARD_CLASSES.iconCaption}>{likesCount > 0 && likesCount}</BntBox>
						</BntBox>
					)}
					{commentable && (
						<BntBox className={EVENT_CARD_CLASSES.cardActionGroup}>
							<IconButton aria-label="Comment" onClick={handleComment} className={EVENT_CARD_CLASSES.cardActionButton}>
								<Comment />
							</IconButton>
							<BntBox className={EVENT_CARD_CLASSES.iconCaption}>{commentsCount > 0 && commentsCount}</BntBox>
						</BntBox>
					)}
					{editable && (
						<BntBox className={EVENT_CARD_CLASSES.cardActionGroup}>
							<IconButton onClick={handleEdit} aria-label="edit" className={EVENT_CARD_CLASSES.cardActionButton}>
								<Edit />
							</IconButton>
						</BntBox>
					)}

					<BntTypography variant="caption" className={EVENT_CARD_CLASSES.cardDateCaption}>
						{formatStringDate(date_string_utc, false, true)}
					</BntTypography>
				</BntCardActions>
			) : null}
		</BntCard>
	);
}
