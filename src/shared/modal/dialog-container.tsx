import { useContext } from "react";
import { BntDialog } from "shared/modal/dialog";
import { BntDialogCloseContext, BntDialogValueContext } from "shared/modal/dialog-context";
import { BntStack } from "shared/stack/stack";
import { CloseOutlined } from "@mui/icons-material";
import { BntIconButton } from "shared/icon-button/bnt-icon-button";
import { useMediaQuery, useTheme } from "@mui/material";
import { BntRoundButton } from "shared/buttons/round-button";
import { texts_c } from "services/localization/texts/texts_c";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntDivider } from "shared/divider/bnt-divider";
import { BntTypography } from "shared/typography/typography";

export const BntDialogContainer = () => {
	const modals = useContext(BntDialogValueContext);
	const { t } = useBntTranslate();
	const handleClose = useContext(BntDialogCloseContext);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<>
			{[...modals].map((modal) => {
				return (
					<BntDialog
						key={modal.modalKey}
						handleClose={() => handleClose(modal.modalKey)}
						modal={modal}
						open={Boolean(modal.modalKey)}
						preventCloseOnBackDropClick={modal.preventCloseOnBackDropClick}
					>
						{modal.hasTopMenu && !fullScreen ? (
							<>
								<BntStack
									className="p-3"
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									sx={{ color: "success.dark" }}
								>
									<BntTypography variant="h5">{t(modal.title, { capitalize: true })}</BntTypography>
									<BntIconButton onClick={() => handleClose(modal.modalKey)}>
										<CloseOutlined />
									</BntIconButton>
								</BntStack>
								<BntDivider />
							</>
						) : null}
						{modal.renderItem(modal, { close: () => handleClose(modal.modalKey) })}
						{fullScreen && (
							<BntRoundButton onClick={() => handleClose(modal.modalKey)}>
								{t(texts_c.close)}
							</BntRoundButton>
						)}
					</BntDialog>
				);
			})}
		</>
	);
};
