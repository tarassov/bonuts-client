import type { FC } from "react";
import RedeemOutlined from "@mui/icons-material/RedeemOutlined";
import { Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c, texts_s } from "services/localization/texts";

import { BntTransparentButton } from "@/shared/ui/buttons";

import { SubmitButtonVariant } from "./types/bnt-form";

const BrandSubmitButton = styled(Button)(({ theme }) => ({
	display: "inline-flex",
	alignItems: "center",
	gap: "11px",
	minWidth: 0,
	height: "50px",
	padding: "0 24px 0 15px",
	border: "none",
	borderRadius: "14px",
	background: "linear-gradient(90deg, #ff8a3d 0%, #e6ad57 100%)",
	boxShadow: "0 12px 24px rgba(255,138,61,.28)",
	color: "#fff",
	fontFamily: "Roboto",
	fontSize: "16px",
	fontWeight: 700,
	lineHeight: 1,
	textTransform: "none",
	transition: "transform 200ms ease, box-shadow 200ms ease, filter 200ms ease",
	"& .MuiButton-startIcon": {
		margin: 0,
	},
	"& .MuiButton-startIcon > *:first-of-type": {
		fontSize: "21px",
	},
	"&:hover": {
		background: "linear-gradient(90deg, #ff8a3d 0%, #e6ad57 100%)",
		transform: "translateY(-2px)",
		boxShadow: "0 16px 34px rgba(255,138,61,.44)",
		filter: "brightness(1.05)",
	},
	"&:active": {
		transform: "translateY(0)",
		boxShadow: "0 10px 20px rgba(255,138,61,.24)",
		filter: "brightness(1)",
	},
	"&.Mui-disabled": {
		background: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[400],
		boxShadow: "none",
		color: theme.palette.common.white,
		cursor: "default",
	},
	"@media (prefers-reduced-motion: reduce)": {
		transition: "box-shadow 200ms ease",
		"&:hover": {
			transform: "none",
			filter: "none",
		},
		"&:active": {
			transform: "none",
			filter: "none",
		},
	},
}));

const BrandIconCircle = styled("span")({
	width: "34px",
	height: "34px",
	borderRadius: "50%",
	background: "rgba(255,255,255,.22)",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	flexShrink: 0,
});

export const BntFormSubmit: FC<{
	onCancelClick?: VoidFunction;
	visible?: boolean;
	submitCaption?: string;
	submitButtonVariant?: SubmitButtonVariant;
}> = ({ onCancelClick, visible = false, submitCaption, submitButtonVariant = SubmitButtonVariant.default }) => {
	const { translate } = useBntTranslate();

	const isBrandGradientButton = submitButtonVariant === SubmitButtonVariant.brandGradient;

	return (
		<Stack direction="row" justifyContent={isBrandGradientButton ? "flex-end" : "center"} alignItems="center" spacing={2}>
			{visible && (
				<>
					<BntTransparentButton data-testid="form-cancel-button" color="secondary" onClick={onCancelClick}>
						{translate(texts_c.cancel)}
					</BntTransparentButton>

					{isBrandGradientButton ? (
						<BrandSubmitButton
							data-testid="form-submit-button"
							type="submit"
							startIcon={
								<BrandIconCircle>
									<RedeemOutlined />
								</BrandIconCircle>
							}
						>
							{submitCaption || translate(texts_s.save)}
						</BrandSubmitButton>
					) : (
						<BntTransparentButton data-testid="form-submit-button" type="submit">
							{submitCaption || translate(texts_s.save)}
						</BntTransparentButton>
					)}
				</>
			)}
		</Stack>
	);
};
