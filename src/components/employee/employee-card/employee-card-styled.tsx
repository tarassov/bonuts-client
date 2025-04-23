import { styled } from "@mui/material/styles";
import { cl } from "themes/helper";
import { EmployeeCardPure } from "components/employee/employee-card/employee-card-pure";
import { EMPLOYEE_CARD_CLASSES } from "components/employee/employee-card/classes";

export const EmployeeCardStyled = styled(
	EmployeeCardPure,
	{}
)(({ theme }) => {
	return {
		backgroundColor: theme.palette.secondary.veryLight,
		maxWidth: 300,
		color: theme.palette.neutral.dark,
		margin: "auto",
		"& img": {
			width: "auto",
			height: "auto",
			maxHeight: "160px",
			maxWidth: "100%",
			verticalAlign: "middle",
			margin: "auto",
			border: "0",
			[theme.breakpoints.down("xs")]: {
				maxHeight: "90px",
			},
			boxShadow: "0px 0px 48px rgba(255, 255, 255, 0.8)",
		},
		"&:hover": {
			outline: "2px solid",
			outlineColor: theme.palette.primary.light,
			"& img": {
				transform: "translate3d(0, -3px, 2px)",
				transition: "all 500ms cubic-bezier(0.34, 1.61, 0.7, 1)",
			},
		},

		[cl(EMPLOYEE_CARD_CLASSES.cardBody)]: {
			display: "flex",
			justifyContent: "center",
			minHeight: 200,
		},
		[cl(EMPLOYEE_CARD_CLASSES.captions)]: {
			display: "flex",
			flexDirection: "column",
			gap: "12px",
			alignItems: "center",
		},
	};
});
