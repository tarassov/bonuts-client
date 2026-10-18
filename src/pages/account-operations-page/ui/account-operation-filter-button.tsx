import type { ButtonProps } from "@mui/material";
import { Button, styled } from "@mui/material";

const FilterButton = styled(Button)(({ theme }) => ({
	minHeight: 40,
	paddingInline: 14,
	borderRadius: 999,
	borderColor: theme.palette.divider,
	color: theme.palette.text.secondary,
	fontWeight: 600,
	textTransform: "none",
	whiteSpace: "nowrap",
	"&[aria-pressed='true']": {
		borderColor: "transparent",
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.primary.dark,
	},
}));

interface IAccountOperationFilterButtonProps extends Omit<ButtonProps, "color" | "variant"> {
	isSelected: boolean;
}

export function AccountOperationFilterButton({ isSelected, ...props }: IAccountOperationFilterButtonProps) {
	return <FilterButton {...props} aria-pressed={isSelected} variant="outlined" />;
}
