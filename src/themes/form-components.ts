import type { Theme, ThemeOptions } from "@mui/material/styles";

export const formComponents: ThemeOptions["components"] = {
	MuiInput: {
		styleOverrides: {
			root: ({ theme }: { theme: Theme }) => ({
				borderRadius: 16,
				backgroundColor: theme.palette.neutral.light,
				paddingLeft: 14,
				paddingRight: 14,
				transition: "box-shadow 160ms ease, background-color 160ms ease",
				"&::before, &::after": {
					display: "none",
				},
				"&:hover:not(.Mui-disabled, .Mui-error)": {
					backgroundColor: theme.palette.common.white,
					boxShadow: `0 0 0 1px ${theme.palette.primary.light}`,
				},
				"&.Mui-focused": {
					backgroundColor: theme.palette.common.white,
					boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
				},
				"&.Mui-error": {
					boxShadow: `0 0 0 1px ${theme.palette.error.light}`,
				},
				"&.Mui-disabled": {
					opacity: 0.72,
				},
			}),
			input: ({ theme }: { theme: Theme }) => ({
				paddingTop: 16,
				paddingBottom: 16,
				"&::placeholder": {
					opacity: 1,
					color: theme.palette.text.secondary,
				},
			}),
		},
	},
	MuiInputLabel: {
		styleOverrides: {
			root: {
				transform: "translate(14px, 14px) scale(1)",
			},
			shrink: {
				transform: "translate(14px, -8px) scale(0.75)",
			},
		},
	},
	MuiAutocomplete: {
		styleOverrides: {
			inputRoot: ({ theme }: { theme: Theme }) => ({
				borderRadius: 16,
				backgroundColor: theme.palette.neutral.light,
				paddingLeft: "14px !important",
				paddingRight: "14px !important",
				"&::before, &::after": {
					display: "none",
				},
				"&.Mui-focused": {
					backgroundColor: theme.palette.common.white,
					boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
				},
			}),
			input: ({ theme }: { theme: Theme }) => ({
				paddingTop: "16px !important",
				paddingBottom: "16px !important",
				"&::placeholder": {
					opacity: "1 !important",
					color: theme.palette.text.secondary,
				},
			}),
			tag: ({ theme }: { theme: Theme }) => ({
				backgroundColor: theme.palette.accent.light,
				color: theme.palette.accent.main,
				fontWeight: 600,
			}),
		},
	},
	MuiFormHelperText: {
		styleOverrides: {
			root: {
				marginTop: 8,
			},
		},
	},
};
