import { styled } from "@mui/material/styles";
import { CommentCard } from "components/comment/comment-card/comment-card";

export const CommentCardStyled = styled(
	CommentCard,
	{}
)(({ theme }) => {
	return {
		width: "100%",
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.getContrastText(theme.palette.background.default),
		maxWidth: 700,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	};
});
