import { FC, useState } from "react";
import { TPost } from "../../types/model/post";
import {
	Android,
	Comment,
	Edit,
	Expand,
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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Dictionary } from "../../constants/dictionary";

export const BNTEventCard: FC<{ post: TPost }> = ({ post }) => {
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
		date_string,
	} = post;
	const { user_name, avatar_url, position, admin } = profile;
	const { t } = useTranslation();
	const [edit, setEdit] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const handleContentChange = (e: any) => {};
	const handleSubmitEdit = (e: any) => {};
	const handleLike = (e: any) => {};
	const handleComment = (e: any) => {};
	const handleEdit = (e: any) => {};
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card>
			<CardHeader
				avatar={
					<>
						{isPublic && <Avatar src={avatar_url} alt={user_name} />}
						{isPublic && (
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

			<CardActions disableSpacing>
				{(commentable || likeable) && (
					<IconButton aria-label="Add to favorites" onClick={handleLike}>
						<Favorite />
						{likes.length > 0 && likes.length}
					</IconButton>
				)}
				{commentable && (
					<IconButton aria-label="Comment" onClick={handleComment}>
						<Comment />
						{comments_count !== undefined &&
							comments_count !== 0 &&
							comments_count}
					</IconButton>
				)}
				{profile !== undefined && profile.admin && (
					<IconButton onClick={handleEdit} aria-label="edit">
						<Edit />
					</IconButton>
				)}
				{extra_content && (
					<IconButton
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="Show more"
					>
						<Expand />
					</IconButton>
				)}

				<Typography variant="caption" component="div">
					{date_string}
				</Typography>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>{extra_content}</CardContent>
			</Collapse>
		</Card>
	);
};
