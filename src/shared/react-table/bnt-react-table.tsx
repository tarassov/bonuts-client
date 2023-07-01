import { styled } from "@mui/material/styles";
import { cl, hover } from "themes/helper";
import { BntReactTablePure } from "shared/react-table/bnt-react-table-pure";

export const BntReactTable = styled(
	BntReactTablePure,
	{}
)(({ theme }) => {
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
			paddingLeft: 0,
			paddingRight: 0,
			fontSize: "1.1rem",
			color: theme.palette.grey[800],
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
			background: theme.palette.grey[200],
		},
		[cl("bnt-table-tr")]: {
			[hover]: {
				background: theme.palette.grey[300],
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
});
