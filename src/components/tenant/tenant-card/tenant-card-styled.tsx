import { styled } from "@mui/material/styles";
import { cl } from "themes/helper";
import { TenantCardPure } from "components/tenant/tenant-card/tenant-card-pure";
import { TENANT_CARD_CLASSES } from "components/tenant/tenant-card/classes";

export const TenantCardStyled = styled(
	TenantCardPure,
	{}
)(({ theme }) => {
	return {
		backgroundColor: theme.palette.primary.light,
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
			outline: "1px solid",
			outlineColor: theme.palette.secondary.light,
		},

		[cl(TENANT_CARD_CLASSES.cardBody)]: {
			display: "flex",
			justifyContent: "center",
			minHeight: 200,
		},
		[cl(TENANT_CARD_CLASSES.captions)]: {
			display: "flex",
			flexDirection: "column",
			gap: "12px",
			alignItems: "center",
		},
		[cl(TENANT_CARD_CLASSES.cardHeaderHover)]: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
			alignItems: "center",
			justifyContent: "center",
		},
	};
});
