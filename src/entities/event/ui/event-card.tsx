import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Android, Comment, Edit, Favorite, Lock } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import classNames from "classnames";

import { BntBox } from "shared/ui/box/bnt-box";
import { BntCard } from "shared/ui/card/card";
import { BntCardActions } from "shared/ui/card/card-actions";
import { BntCardContent } from "shared/ui/card/card-content";
import { BntTypography } from "shared/ui/typography/typography";

import { emptyFunction } from "utils/empty-function";
import { focusInput } from "utils/focus-input";
import { formatStringDate } from "utils/format-string-date";

import { Dictionary } from "constants/dictionary";

import { useEmployeeUi } from "logic/ui/use-employee-ui";
import { useEventUi } from "logic/ui/use-event-ui";

import { BntStyledOperationText } from "components/opearation-text/styled-operation-text";

import { useEventLogic } from "../model/use-event-logic";

import { EVENT_CARD_CLASSES } from "./classes";
import { EventCardHeader } from "./event-card-header";

import { TPost } from "@/types/model/post";

export type EventCardProps = { post: TPost; className?: string; preventNewModal?: boolean };

export function EventCard({ post, className, preventNewModal }: EventCardProps) {
	const {
		profile,
		public: isPublic,
		title,
		content,
		commentable,
		likeable,
		comments_count,
		likes,
		liked,
		editable,
		date_string_utc,
	} = post;
	const { user_name, user_avatar, position } = profile;
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);
	const [edit, setEdit] = useState(false);
	const { toggleLike, updateEvent } = useEventLogic();
	const { showEmployeeModal } = useEmployeeUi();
	const { showDetailedPost } = useEventUi(post);

	const handleSubmitEdit = (e: any) => {
		updateEvent(post, { content: e.target.content.value });
		setEdit(false);
		e.preventDefault();
	};
	const handleLike = () => toggleLike(post);
	const handleComment = !preventNewModal ? showDetailedPost : emptyFunction;
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
		<BntCard className={className}>
			<EventCardHeader
				avatar={
					<>
						{isPublic && <Avatar src={user_avatar?.thumb?.url || undefined} alt={user_name || undefined} />}
						{!isPublic && (
							<Avatar>
								<Android />
							</Avatar>
						)}
					</>
				}
				action={
					<Tooltip title={isPublic ? t(Dictionary.ONLY_YOU_CAN_SEE_IT) : t(Dictionary.PROFILE)}>
						<IconButton
							aria-label={(!isPublic ? t(Dictionary.ONLY_YOU_CAN_SEE_IT) : t(Dictionary.PROFILE)) || Dictionary.PROFILE}
						>
							{!isPublic && <Lock />}
						</IconButton>
					</Tooltip>
				}
				title={isPublic ? title : "Сервис бот"}
				subheader={isPublic && position}
			/>

			<BntCardContent className={EVENT_CARD_CLASSES.cardContent}>
				{post.operation && (
					<BntStyledOperationText
						operation={post.operation}
						onFromProfileClick={() => showEmployeeModal(post.operation?.from_profile?.id)}
						onToProfileClick={() => showEmployeeModal(post.operation?.to_profile?.id)}
					/>
				)}
				{!edit && (
					<BntTypography variant="body2" isPreformatted>
						{content}
					</BntTypography>
				)}
				{edit && (
					<Box
						component="form"
						onSubmit={handleSubmitEdit}
						sx={{
							"& .MuiTextField-root": { m: 1, width: "90%" },
						}}
						noValidate
						autoComplete="off"
					>
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

			<BntCardActions disableSpacing className={EVENT_CARD_CLASSES.cardActions}>
				{likeable && (
					<>
						<IconButton
							aria-label="Add to favorites"
							onClick={handleLike}
							className={classNames({
								[EVENT_CARD_CLASSES.liked]: liked,
							})}
						>
							<Favorite />
						</IconButton>
						<BntBox
							className={classNames(EVENT_CARD_CLASSES.iconCaption, {
								[EVENT_CARD_CLASSES.liked]: liked,
							})}
						>
							{likes.length > 0 && likes.length}
						</BntBox>
					</>
				)}
				{commentable && (
					<>
						<IconButton aria-label="Comment" onClick={handleComment}>
							<Comment />
						</IconButton>
						<BntBox className={classNames(EVENT_CARD_CLASSES.iconCaption)}>
							{comments_count !== undefined && comments_count !== 0 && comments_count}
						</BntBox>
					</>
				)}
				{editable && (
					<IconButton onClick={handleEdit} aria-label="edit">
						<Edit />
					</IconButton>
				)}

				<Typography variant="caption" component="div" className={EVENT_CARD_CLASSES.cardDateCaption}>
					{formatStringDate(date_string_utc, false, true)}
				</Typography>
			</BntCardActions>
		</BntCard>
	);
}
