import { styled } from "@mui/material/styles";

import { OPERATION_CLASSES } from "components/opearation-text/classes";
import { BntOperationText } from "components/opearation-text/operation-text";

import { cl } from "themes/helper";

export const EventOperationText = styled(BntOperationText)(({ theme }) => ({
	[cl(OPERATION_CLASSES.operationText)]: {
		display: "inline-flex",
		margin: "auto 0",
		padding: 0,
		whiteSpace: "pre-wrap",
		wordBreak: "break-word",
		alignItems: "center",
	},
	[cl(OPERATION_CLASSES.amountText)]: {
		fontSize: 26,
		fontWeight: 700,
		lineHeight: 1.1,
	},
	[cl(OPERATION_CLASSES.plusText)]: {
		color: theme.palette.primary.main,
	},
	[cl(OPERATION_CLASSES.minusText)]: {
		color: theme.palette.error.main,
	},
	[cl(OPERATION_CLASSES.emojiText)]: {
		fontSize: 20,
		lineHeight: 1,
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
	},
	[cl(OPERATION_CLASSES.eventArrow)]: {
		fontSize: 22,
		fontWeight: 700,
		lineHeight: 1,
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.75),
		color: theme.palette.neutral.dark,
		opacity: 0.72,
	},
	[cl(OPERATION_CLASSES.operationContainer)]: {
		padding: 0,
		margin: 0,
		alignItems: "center",
		columnGap: theme.spacing(0.25),
		rowGap: theme.spacing(0.75),
	},
	[cl(OPERATION_CLASSES.profileButton)]: {
		color: theme.palette.neutral.dark,
		"&:hover": {
			backgroundColor: "transparent",
			color: theme.palette.text.primary,
		},
	},
	[cl(OPERATION_CLASSES.profileName)]: {
		color: theme.palette.neutral.dark,
	},
}));
