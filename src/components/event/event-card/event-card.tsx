import { FC, useEffect, useRef, useState } from "react";
import { TPost } from "../../../types/model/post";
import {
	Android,
	Comment,
	Edit,
	Expand,
	ExpandMore,
	Favorite,
	Lock,
} from "@mui/icons-material";
import {
	Avatar,
	Tooltip,
	Card,
	CardHeader,
	IconButton,
	CardContent,
	CardActions,
	Typography,
	TextField,
	Button,
	Collapse,
	Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Dictionary } from "../../../constants/dictionary";
import { BntStyledCardHeader } from "./event-card-header";
import classNames from "classnames";
import { EVENT_CARD_CLASSES } from "./event-card-styled";
import { useEventLogic } from "../../../logic/hooks/useEventLogic";
import { BntOperationText } from "../../opearation-text/operation-text";
import { BntStyledOperationText } from "../../opearation-text/styled-operation-text";
import { focusInput } from "../../../utils/focus-input";

export const BntEventCard: FC<{ post: TPost; className?: string }> = ({
	post,
	className,
}) => {
	const {
		profile,
		public: isPublic,
		extra_content,
		title,
		content,
		commentable,
		likeable,
		comments_count,
		likes,
		liked,
		date_string,
		editable,
	} = post;
	const { user_name, user_avatar, position, admin } = profile;
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);
	const [edit, setEdit] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const { toggleLike, updateEvent } = useEventLogic();

	const handleContentChange = (e: any) => {};
	const handleSubmitEdit = (e: any) => {
		updateEvent(post, { content: e.target.content.value });
		setEdit(false);
		e.preventDefault();
	};
	const handleLike = (e: any) => toggleLike(post);
	const handleComment = (e: any) => {};
	const handleEdit = (e: any) => {
		e.preventDefault();
		setEdit(() => !edit);
	};

	const onBlur = () => {
		setTimeout(() => {
			setEdit(false);
		}, 100);
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

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
		<Card className={className}>
			<BntStyledCardHeader
				avatar={
					<>
						{isPublic && (
							<Avatar
								src={user_avatar?.thumb?.url || undefined}
								alt={user_name || undefined}
							/>
						)}
						{!isPublic && (
							<Avatar>
								<Android />
							</Avatar>
						)}
					</>
				}
				action={
					<Tooltip
						title={
							isPublic
								? t(Dictionary.ONLY_YOU_CAN_SEE_IT)
								: t(Dictionary.PROFILE)
						}
					>
						<IconButton
							aria-label={
								(!isPublic
									? t(Dictionary.ONLY_YOU_CAN_SEE_IT)
									: t(Dictionary.PROFILE)) || Dictionary.PROFILE
							}
						>
							{!isPublic && <Lock />}
						</IconButton>
					</Tooltip>
				}
				title={isPublic ? title : "Сервис бот"}
				subheader={isPublic && position}
			/>

			<CardContent>
				{post.operation && (
					<BntStyledOperationText operation={post.operation} />
				)}
				{!edit && (
					<Typography variant="body2" component="p">
						{content}
					</Typography>
				)}
				{edit && (
					<Box
						component={"form"}
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
							//onChange={handleContentChange}
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
			</CardContent>

			<CardActions disableSpacing className={EVENT_CARD_CLASSES.cardActions}>
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
						<Box
							className={classNames(EVENT_CARD_CLASSES.iconCaption, {
								[EVENT_CARD_CLASSES.liked]: liked,
							})}
						>
							{likes.length > 0 && likes.length}
						</Box>
					</>
				)}
				{commentable && (
					<>
						<IconButton aria-label="Comment" onClick={handleComment}>
							<Comment />
						</IconButton>
						<Box className={classNames(EVENT_CARD_CLASSES.iconCaption)}>
							{comments_count !== undefined &&
								comments_count !== 0 &&
								comments_count}
						</Box>
					</>
				)}
				{editable && (
					<IconButton onClick={handleEdit} aria-label="edit">
						<Edit />
					</IconButton>
				)}
				{extra_content && (
					<IconButton
						className={classNames(EVENT_CARD_CLASSES.expand, {
							[EVENT_CARD_CLASSES.expandOpened]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="Show more"
					>
						<ExpandMore />
					</IconButton>
				)}

				<Typography
					variant="caption"
					component="div"
					className={EVENT_CARD_CLASSES.cardDateCaption}
				>
					{date_string}
				</Typography>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>{extra_content}</CardContent>
			</Collapse>
		</Card>
	);
};
