import { FC, useState } from "react";
import { TPost } from "../../types/model/post";
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
import { Dictionary } from "../../constants/dictionary";
import { BNTStyledCardHeader } from "./event-card-header";
import classNames from "classnames";
import { EVENT_CARD_CLASSES } from "./index";
import { useLikeEvent } from "../../hooks/logic/useLikeEvent";

export const BNTEventCard: FC<{ post: TPost; className?: string }> = ({
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
	} = post;
	const { user_name, avatar_url, position, admin } = profile;
	const { t } = useTranslation();
	const [edit, setEdit] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const toggleLike = useLikeEvent();

	const handleContentChange = (e: any) => {};
	const handleSubmitEdit = (e: any) => {};
	const handleLike = (e: any) => toggleLike(post);
	const handleComment = (e: any) => {};
	const handleEdit = (e: any) => {};
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={className}>
			<BNTStyledCardHeader
				avatar={
					<>
						{isPublic && <Avatar src={avatar_url} alt={user_name} />}
						{!isPublic && (
							<Avatar>
								<Android />
							</Avatar>
						)}
					</>
				}
				action={
					<Tooltip
						title={isPublic ? t(Dictionary.ONLY_YOU_CAN_SEE_IT) : t("Profile")}
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
				{/*<OperationContainer receiver operation={post.operation} />*/}
				{!edit && <Typography component="p">{content}</Typography>}
				{edit && (
					<form onSubmit={handleSubmitEdit} noValidate autoComplete="off">
						<TextField
							autoFocus
							margin="dense"
							id="content_value"
							onChange={handleContentChange}
							value={content}
							fullWidth
							multiline
						/>
						<Button type="submit" color="primary" autoFocus>
							Submit
						</Button>
					</form>
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
				{profile !== undefined && profile.admin && (
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
