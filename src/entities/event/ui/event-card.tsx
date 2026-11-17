import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, TextField } from "@mui/material";

import classNames from "classnames";

import { BntCard, BntCardContent } from "@/shared/ui/card";
import { useNotification } from "@/shared/ui/notification";
import { BntTypography } from "@/shared/ui/typography";

import { useEmployeeUi } from "@/entities/profile";

import { getEventCardRecipient } from "../lib/get-event-card-recipient";
import { useEventLogic } from "../model/use-event-logic";
import { useEventUi } from "../model/use-event-ui";

import { EVENT_CARD_CLASSES } from "./classes";
import { EventCardActions } from "./event-card-actions";
import { EventCardHeader } from "./event-card-header";
import { EventImages } from "./event-images";
import { EventOperationText } from "./event-operation-text";
import { EventRecognitionHeader } from "./event-recognition-header";
import { texts_p, texts_s } from "@/services/localization/texts";
import type { TPost } from "@/types/model/post";
import { emptyFunction } from "@/utils/empty-function";
import { focusInput } from "@/utils/focus-input";

export type EventCardProps = { post: TPost; className?: string; preventNewModal?: boolean };

export function EventCard({ post, className, preventNewModal }: EventCardProps) {
	const { public: isPublic, content, images } = post;
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);
	const [edit, setEdit] = useState(false);
	const { toggleLike, updateEvent } = useEventLogic();
	const { showResponseError } = useNotification();
	const { showEmployeeModal } = useEmployeeUi();
	const { showDetailedPost } = useEventUi(post);
	const notification = !isPublic;
	const recipient = getEventCardRecipient(post);

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
			{recipient ? <EventRecognitionHeader post={post} recipient={recipient} /> : <EventCardHeader post={post} />}

			<BntCardContent className={EVENT_CARD_CLASSES.cardContent}>
				{post.operation && !recipient && (
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
							{t(texts_s.submit)}
						</Button>
					</Box>
				)}
				<EventImages images={images} imageLabel={t(texts_p.photos)} />
			</BntCardContent>

			{!notification ? <EventCardActions post={post} onLike={handleLike} onComment={handleComment} onEdit={handleEdit} /> : null}
		</BntCard>
	);
}
