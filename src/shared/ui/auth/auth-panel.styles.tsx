import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const AuthHeroRoot = styled(Stack)(({ theme }) => ({
	display: "none",
	position: "relative",
	flex: "1 1 56%",
	minHeight: 640,
	padding: 48,
	overflow: "hidden",
	color: "#372411",
	background: `radial-gradient(circle at top right, ${alpha(theme.palette.common.white, 0.34)} 0%, transparent 30%),
		linear-gradient(145deg, ${theme.palette.primary.main} 10%, ${theme.palette.warning.light} 52%, ${theme.palette.common.white} 100%)`,
	[theme.breakpoints.up("md")]: {
		display: "flex",
	},
	"&::before, &::after": {
		content: '""',
		position: "absolute",
		borderRadius: 999,
		border: "1px solid rgba(159, 90, 11, 0.14)",
		opacity: 0.9,
	},
	"&::before": {
		inset: "auto auto 36px -42px",
		width: 192,
		height: 192,
	},
	"&::after": {
		inset: "18px 22px auto auto",
		width: 108,
		height: 108,
	},
}));

export const AuthHeroEyebrow = styled(Typography)({
	fontSize: "0.95rem",
	fontWeight: 700,
	lineHeight: 1.4,
	letterSpacing: "0.08em",
	textTransform: "uppercase",
	color: "rgba(55, 36, 17, 0.72)",
});

export const AuthHeroTitle = styled(Typography)({
	maxWidth: 360,
	marginTop: 14,
	fontSize: "clamp(2.75rem, 3vw, 4rem)",
	fontWeight: 800,
	lineHeight: 0.96,
	letterSpacing: "-0.04em",
});

export const AuthHeroSubtitle = styled(Typography)({
	maxWidth: 400,
	marginTop: 16,
	fontSize: "1.125rem",
	lineHeight: 1.5,
	whiteSpace: "pre-line",
	color: "rgba(55, 36, 17, 0.78)",
});

export const AuthHeroSocialProof = styled(Typography)({
	marginTop: 28,
	fontSize: "1rem",
	fontWeight: 600,
	lineHeight: 1.5,
	color: "rgba(55, 36, 17, 0.8)",
});

export const AuthFormColumn = styled(Stack)(({ theme }) => ({
	flexDirection: "column",
	gap: 24,
	width: "min(100%, 420px)",
	alignSelf: "center",
	padding: "28px 20px",
	[theme.breakpoints.up("sm")]: {
		padding: 32,
	},
	[theme.breakpoints.up("md")]: {
		width: "auto",
		alignSelf: "stretch",
		flex: "0 0 420px",
		padding: "44px 40px 36px",
		justifyContent: "center",
	},
}));

export const AuthPageCard = styled(Paper)(({ theme }) => ({
	width: "min(100%, 440px)",
	padding: "32px 24px 28px",
	border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.divider : alpha(theme.palette.text.secondary, 0.12)}`,
	borderRadius: 24,
	boxShadow:
		theme.palette.mode === "dark"
			? `0 1px 2px ${alpha(theme.palette.common.black, 0.38)}, 0 12px 28px ${alpha(theme.palette.common.black, 0.28)}`
			: `0 1px 3px ${alpha(theme.palette.common.black, 0.08)}, 0 12px 32px ${alpha(theme.palette.common.black, 0.06)}`,
	[theme.breakpoints.up("sm")]: {
		padding: "40px 40px 36px",
	},
}));

export const AuthTextField = styled(TextField)(({ theme }) => ({
	"& .MuiInputBase-root": {
		gap: 8,
	},
	"& .MuiInputAdornment-root": {
		color: theme.palette.text.secondary,
	},
	"& .MuiFormHelperText-root": {
		minHeight: 20,
		marginTop: 6,
		fontSize: 12,
		lineHeight: 1.2,
		color: theme.palette.text.secondary,
	},
	"& .MuiFormHelperText-root.Mui-error": {
		color: theme.palette.text.secondary,
	},
}));

export const AuthSubmitButton = styled(Button)(({ theme }) => ({
	minHeight: 48,
	borderRadius: 12,
	background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.light} 100%)`,
	boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.22)}`,
	"&:hover": {
		boxShadow: `0 14px 28px ${alpha(theme.palette.primary.main, 0.28)}`,
	},
	"&.Mui-disabled": {
		background: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.14) : theme.palette.grey[300],
		color: theme.palette.text.disabled,
		boxShadow: "none",
	},
}));

export const AuthOutlinedButton = styled(Button)(({ theme }) => ({
	minHeight: 48,
	borderRadius: 12,
	backgroundColor: theme.palette.neutral.light,
	borderColor: alpha(theme.palette.text.secondary, 0.22),
	color: theme.palette.text.primary,
	"&:hover": {
		backgroundColor: alpha(theme.palette.info.main, 0.08),
		borderColor: alpha(theme.palette.info.main, 0.24),
	},
	"&.Mui-disabled": {
		backgroundColor: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.06) : theme.palette.grey[100],
		borderColor: theme.palette.mode === "dark" ? theme.palette.divider : theme.palette.grey[300],
		color: theme.palette.text.disabled,
	},
}));

export const AuthTextButton = styled(Button)({
	minWidth: "auto",
	padding: "4px 0",
	textTransform: "none",
});

export const AuthAccentTextButton = styled(AuthTextButton)(({ theme }) => ({
	fontWeight: 600,
	color: theme.palette.primary.dark,
	"&:hover": {
		backgroundColor: alpha(theme.palette.primary.main, 0.08),
	},
}));

export const AuthDemoButton = styled(Button)(({ theme }) => ({
	minHeight: 46,
	borderRadius: 14,
	textTransform: "none",
	"&.Mui-disabled": {
		backgroundColor: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.06) : theme.palette.grey[100],
		borderColor: theme.palette.mode === "dark" ? theme.palette.divider : theme.palette.grey[300],
		color: theme.palette.text.disabled,
	},
}));
