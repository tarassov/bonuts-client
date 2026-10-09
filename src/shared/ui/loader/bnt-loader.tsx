import * as React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import styles from "./bnt-loader.module.scss";

type AuthCheckLoaderProps = {
	text?: string;
	secondaryText?: string;
	size?: number;
	surface?: boolean;
	sx?: any;
};

export function BntLoader({ text, secondaryText, size = 28, surface = true, sx }: AuthCheckLoaderProps) {
	// Design tokens (fallbacks), если не заведены в MUI theme.palette
	const TOKENS = {
		bgAppLight: "#F7F8FA", // neutral-100
		bgSurfaceLight: "#FFFFFF", // neutral-0
		borderLight: "#E5E7EB", // neutral-300
		textPrimaryLight: "#1E1F25", // neutral-900
		textSecondaryLight: "#6B7280", // neutral-600

		bgAppDark: "#111318",
		bgSurfaceDark: "#1A1D24",
		borderDark: "#2A2E36",
		textPrimaryDark: "#E5E7EB",
		textSecondaryDark: "#9CA3AF",

		primary: "#FF8A3D", // primary-500
	};

	return (
		<Box
			role="status"
			aria-live="polite"
			aria-busy="true"
			className={styles.root}
			sx={{
				px: 3,
				py: 4,
				backgroundColor: (theme) => (theme.palette.mode === "dark" ? (theme.palette.background?.default ?? TOKENS.bgAppDark) : (theme.palette.background?.default ?? TOKENS.bgAppLight)),
				...sx,
			}}
		>
			<Box
				className={`${styles.card} ${surface ? styles.surface : styles.noSurface}`}
				sx={{
					p: surface ? 3 : 0,
					borderColor: (theme) => (theme.palette.mode === "dark" ? (theme.palette.divider ?? TOKENS.borderDark) : (theme.palette.divider ?? TOKENS.borderLight)),
					backgroundColor: surface
						? (theme) => (theme.palette.mode === "dark" ? (theme.palette.background?.paper ?? TOKENS.bgSurfaceDark) : (theme.palette.background?.paper ?? TOKENS.bgSurfaceLight))
						: undefined,
				}}
			>
				<CircularProgress
					size={size} // external variable
					thickness={4.2}
					sx={{
						color: (theme) => theme.palette.primary?.main ?? TOKENS.primary, // theme-connected
					}}
				/>

				<Typography
					variant="body2"
					className={styles.primaryText}
					sx={{
						color: (theme) => (theme.palette.mode === "dark" ? (theme.palette.text?.primary ?? TOKENS.textPrimaryDark) : (theme.palette.text?.primary ?? TOKENS.textPrimaryLight)),
					}}
				>
					{text}
				</Typography>

				<Typography
					variant="caption"
					className={styles.secondaryText}
					sx={{
						color: (theme) => (theme.palette.mode === "dark" ? (theme.palette.text?.secondary ?? TOKENS.textSecondaryDark) : (theme.palette.text?.secondary ?? TOKENS.textSecondaryLight)),
					}}
				>
					{secondaryText}
				</Typography>
			</Box>
		</Box>
	);
}
