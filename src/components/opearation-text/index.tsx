import { styled } from "@mui/material/styles";
import { BNTEventCard } from "../event/event-card/event-card";
import { cl } from "../../themes/helper";
import { BNTOperationText } from "./operation-text";

export const OPERATION_CLASSES = {
	operationText: "operation-text",
	amountText: "amount-text",
	plusText: "plus-text",
	minusText: "minus-text",
	expand: "expand",
	expandOpened: "expand-opened",
	iconCaption: "icon-caption",
	operationContainer: "operation-container",
};
export const BNTStyledOperationText = styled(
	BNTOperationText,
	{}
)(({ theme }) => {
	return {
		[cl(OPERATION_CLASSES.operationText)]: {
			display: "inline-flex",
			margin: "auto 2px",
			padding: 2,
			whiteSpace: "pre-wrap" /* css-3 */,
			wordBreak: "break-word",
		},
		[cl(OPERATION_CLASSES.amountText)]: {
			fontSize: 20,
			fontWeight: "bold",
		},
		[cl(OPERATION_CLASSES.plusText)]: {
			color: theme.palette.primary.light,
		},
		[cl(OPERATION_CLASSES.minusText)]: {
			color: theme.palette.error.light,
		},
		[cl(OPERATION_CLASSES.operationContainer)]: {
			padding: 0,
			margin: 0,
		},
	};
});
