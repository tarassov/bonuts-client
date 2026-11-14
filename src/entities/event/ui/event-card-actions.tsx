import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { Comment, Edit, Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import classNames from "classnames";

import { formatStringDate } from "@/shared/lib/date";
import { BntBox } from "@/shared/ui/box";
import { BntCardActions } from "@/shared/ui/card";
import { BntTypography } from "@/shared/ui/typography";

import { EVENT_CARD_CLASSES } from "./classes";
import { texts_a, texts_c, texts_e } from "@/services/localization/texts";
import type { TPost } from "@/types/model/post";

type TEventCardActionsProps = {
	post: TPost;
	onLike: VoidFunction;
	onComment: VoidFunction;
	onEdit: MouseEventHandler<HTMLButtonElement>;
};

export function EventCardActions({ post, onLike, onComment, onEdit }: TEventCardActionsProps) {
	const { likeable, commentable, editable, liked, likes, comments_count, date_string_utc } = post;
	const { t } = useTranslation();
	const likesCount = likes.length;
	const commentsCount = comments_count || 0;

	return (
		<BntCardActions disableSpacing className={EVENT_CARD_CLASSES.cardActions}>
			{likeable && (
				<BntBox className={EVENT_CARD_CLASSES.cardActionGroup}>
					<IconButton
						aria-label={t(texts_a.add_to_favorites) || texts_a.add_to_favorites}
						onClick={onLike}
						aria-pressed={liked}
						className={classNames(EVENT_CARD_CLASSES.cardActionButton, {
							[EVENT_CARD_CLASSES.liked]: liked,
						})}
					>
						<Favorite />
						<span className={EVENT_CARD_CLASSES.iconCaption}>{likesCount}</span>
					</IconButton>
				</BntBox>
			)}
			{commentable && (
				<BntBox className={EVENT_CARD_CLASSES.cardActionGroup}>
					<IconButton aria-label={t(texts_c.comment) || texts_c.comment} onClick={onComment} className={EVENT_CARD_CLASSES.cardActionButton}>
						<Comment />
						<span className={EVENT_CARD_CLASSES.iconCaption}>{commentsCount}</span>
					</IconButton>
				</BntBox>
			)}
			{editable && (
				<BntBox className={EVENT_CARD_CLASSES.cardActionGroup}>
					<IconButton onClick={onEdit} aria-label={t(texts_e.edit) || texts_e.edit} className={EVENT_CARD_CLASSES.cardActionButton}>
						<Edit />
					</IconButton>
				</BntBox>
			)}

			<BntTypography variant="caption" className={EVENT_CARD_CLASSES.cardDateCaption}>
				{formatStringDate(date_string_utc, false, true)}
			</BntTypography>
		</BntCardActions>
	);
}
