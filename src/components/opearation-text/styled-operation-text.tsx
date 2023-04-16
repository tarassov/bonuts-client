import { styled } from "@mui/material/styles";
import { OPERATION_CLASSES } from "components/opearation-text/classes";
import { cl } from "themes/helper";
import { BntOperationText } from "./operation-text";

export const BntStyledOperationText = styled(
	BntOperationText,
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
