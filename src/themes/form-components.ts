import type { Theme, ThemeOptions } from "@mui/material/styles";

const getInputSurfaceColors = (theme: Theme) => {
	const isDark = theme.palette.mode === "dark";

	return {
		base: isDark ? "#202531" : theme.palette.neutral.light,
		hover: isDark ? "#262C3A" : theme.palette.common.white,
		focused: isDark ? "#262C3A" : theme.palette.common.white,
		border: isDark ? theme.palette.neutral.main : theme.palette.primary.light,
	};
};

export const formComponents: ThemeOptions["components"] = {
	MuiOutlinedInput: {
		styleOverrides: {
			root: ({ theme }: { theme: Theme }) => {
				const surface = getInputSurfaceColors(theme);

				return {
					borderRadius: 16,
					backgroundColor: surface.base,
					transition: "box-shadow 160ms ease, background-color 160ms ease",
					color: theme.palette.text.primary,
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: theme.palette.divider,
					},
					"&:hover:not(.Mui-disabled, .Mui-error) .MuiOutlinedInput-notchedOutline": {
						borderColor: surface.border,
					},
					"&:hover:not(.Mui-disabled, .Mui-error)": {
						backgroundColor: surface.hover,
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: surface.border,
						borderWidth: 1,
					},
					"&.Mui-focused": {
						backgroundColor: surface.focused,
						boxShadow: `0 0 0 2px ${surface.border}`,
					},
					"&.Mui-error .MuiOutlinedInput-notchedOutline": {
						borderColor: theme.palette.error.light,
					},
					"&.Mui-error": {
						boxShadow: `0 0 0 1px ${theme.palette.error.light}`,
					},
					"&.Mui-disabled": {
						opacity: 0.72,
					},
				};
			},
			input: ({ theme }: { theme: Theme }) => ({
				paddingTop: 16,
				paddingBottom: 16,
				color: theme.palette.text.primary,
				"&::placeholder": {
					opacity: 1,
					color: theme.palette.text.secondary,
				},
			}),
		},
	},
	MuiInput: {
		styleOverrides: {
			root: ({ theme }: { theme: Theme }) => {
				const surface = getInputSurfaceColors(theme);

				return {
					borderRadius: 16,
					backgroundColor: surface.base,
					paddingLeft: 14,
					paddingRight: 14,
					transition: "box-shadow 160ms ease, background-color 160ms ease",
					color: theme.palette.text.primary,
					"&::before, &::after": {
						display: "none",
					},
					"&:hover:not(.Mui-disabled, .Mui-error)": {
						backgroundColor: surface.hover,
						boxShadow: `0 0 0 1px ${surface.border}`,
					},
					"&.Mui-focused": {
						backgroundColor: surface.focused,
						boxShadow: `0 0 0 2px ${surface.border}`,
					},
					"&.Mui-error": {
						boxShadow: `0 0 0 1px ${theme.palette.error.light}`,
					},
					"&.Mui-disabled": {
						opacity: 0.72,
					},
				};
			},
			input: ({ theme }: { theme: Theme }) => ({
				paddingTop: 16,
				paddingBottom: 16,
				color: theme.palette.text.primary,
				"&::placeholder": {
					opacity: 1,
					color: theme.palette.text.secondary,
				},
			}),
		},
	},
	MuiInputLabel: {
		styleOverrides: {
			root: ({ theme }: { theme: Theme }) => ({
				color: theme.palette.mode === "dark" ? theme.palette.text.secondary : theme.palette.neutral.dark,
				transform: "translate(14px, 14px) scale(1)",
				"&.Mui-focused": {
					color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.dark,
				},
			}),
			shrink: ({ theme }: { theme: Theme }) => ({
				transform: "translate(14px, -8px) scale(0.75)",
				color: theme.palette.mode === "dark" ? theme.palette.text.secondary : theme.palette.neutral.dark,
			}),
		},
	},
	MuiAutocomplete: {
		styleOverrides: {
			inputRoot: ({ theme }: { theme: Theme }) => {
				const surface = getInputSurfaceColors(theme);

				return {
					borderRadius: 16,
					backgroundColor: surface.base,
					paddingLeft: "14px !important",
					paddingRight: "14px !important",
					color: theme.palette.text.primary,
					"&::before, &::after": {
						display: "none",
					},
					"&:hover:not(.Mui-disabled, .Mui-error)": {
						backgroundColor: surface.hover,
					},
					"&.Mui-focused": {
						backgroundColor: surface.focused,
						boxShadow: `0 0 0 2px ${surface.border}`,
					},
				};
			},
			input: ({ theme }: { theme: Theme }) => ({
				paddingTop: "16px !important",
				paddingBottom: "16px !important",
				color: `${theme.palette.text.primary} !important`,
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
			root: ({ theme }: { theme: Theme }) => ({
				marginTop: 8,
				color: theme.palette.text.secondary,
				"&.Mui-error": {
					color: theme.palette.error.light,
				},
			}),
		},
	},
};
