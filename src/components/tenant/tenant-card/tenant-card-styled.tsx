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
		[cl(TENANT_CARD_CLASSES.tenantDefaultLogo)]: {
			"& img": {
				width: "auto",
				height: "auto",
				maxHeight: "100px",
				maxWidth: "100%",
				verticalAlign: "middle",
				margin: "auto",
				border: "0",
				[theme.breakpoints.down("xs")]: {
					maxHeight: "60px",
				},
			},
		},
		[cl(TENANT_CARD_CLASSES.tenantLogo)]: {
			"& img": {
				boxShadow: "0px 0px 48px rgba(255, 255, 255, 0.8)",
			},
		},
		"&:hover": {
			outline: "1px solid",
			outlineColor: theme.palette.secondary.light,
		},

		[cl(TENANT_CARD_CLASSES.cardBody)]: {
			display: "flex",
			justifyContent: "center",
			minHeight: 150,
		},
		[cl(TENANT_CARD_CLASSES.captions)]: {
			display: "flex",
			flexDirection: "column",
			gap: "12px",
			alignItems: "center",
		},
		[cl(TENANT_CARD_CLASSES.error)]: {
			color: theme.palette.error.main,
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
