import { alpha, styled } from "@mui/material/styles";

import { BntReactTablePure } from "./bnt-react-table-pure";
import { cl, hover } from "themes/helper";

export const BntReactTable = styled(
	BntReactTablePure,
	{}
)(({ theme }) => {
	const isDarkTheme = theme.palette.mode === "dark";
	const rowEvenBackground = isDarkTheme ? alpha(theme.palette.common.white, 0.02) : theme.palette.grey[100];
	const rowHoverBackground = isDarkTheme ? alpha(theme.palette.common.white, 0.06) : theme.palette.grey[200];

	return {
		overflowX: "unset",
		"& table": {
			border: 0,
		},
		"& tbody": {
			border: 0,
		},
		"& td": {
			border: 0,
			...theme.typography.body2,
			paddingTop: 4,
			paddingBottom: 4,
			paddingLeft: 0,
			paddingRight: 0,
			fontSize: "1.1rem",
			color: isDarkTheme ? theme.palette.text.primary : theme.palette.grey[800],
		},
		"& tr": {
			border: 0,
		},
		"& input": {
			border: 0,
		},
		[cl("bnt-table-th")]: {
			minWidth: "60px",
			padding: "4px",
		},
		[cl("bnt-table-filter")]: {
			width: "100%",
		},
		[cl("bnt-table-tr-even")]: {
			background: rowEvenBackground,
		},
		[cl("bnt-table-tr")]: {
			[hover]: {
				background: rowHoverBackground,
			},
		},
		[cl("bnt-navigation-button")]: {
			width: "50%",
			[theme.breakpoints.down("sm")]: {
				width: "100%",
			},
		},
		[cl("bnt-table-header")]: {
			border: 0,
			borderColor: theme.palette.grey[400],
			...theme.typography.h6,
			marginBottom: "24px",
			"& input": {
				width: "100%",
			},
			"& .sorter": {
				"&:hover": {
					color: theme.palette.primary.dark,
					cursor: "pointer",
				},
			},
			"& .sort-icon": {
				opacity: 0.2,
			},
			"& .sort-asc": {
				"& .sort-icon__asc": {
					color: theme.palette.primary.dark,
					opacity: 1,
				},
			},
			"& .sort-desc": {
				"& .sort-icon__desc": {
					color: theme.palette.primary.dark,
					opacity: 1,
				},
			},
		},
		[cl("bnt-table-footer")]: {
			marginTop: "24px",
			paddingLeft: "16px",
		},
	};
}) as typeof BntReactTablePure;
