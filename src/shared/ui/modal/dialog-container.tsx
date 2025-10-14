import { useContext, useState } from "react";
import * as React from "react";
import { CloseOutlined } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import _ from "lodash";

import { BntBox } from "shared/ui/box/bnt-box";
import { BntRoundButton } from "shared/ui/buttons/round-button";
import { BntDivider } from "shared/ui/divider/bnt-divider";
import { BntIconButton } from "shared/ui/icon-button/bnt-icon-button";
import { BntModalLoader } from "shared/ui/loader/modal-loader";
import { BntDialog } from "shared/ui/modal/dialog";
import { BntDialogCloseContext, BntDialogValueContext } from "shared/ui/modal/dialog-context";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { texts_c } from "services/localization/texts/texts_c";

import { useBntTranslate } from "hooks/use-bnt-translate";

export function BntDialogContainer() {
	const modals = useContext(BntDialogValueContext);
	const { t } = useBntTranslate();
	const handleClose = useContext(BntDialogCloseContext);
	const [loadingModal, setLoadingModal] = useState<Record<string, boolean>>({});
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const moduleSetLoading = (key: string, value: boolean) => {
		setLoadingModal((prev) => {
			return { ...prev, [key]: value };
		});
	};
	return (
		<>
			{[...modals].map((modal) => {
				const title = modal.title ? (_.isFunction(modal.title) ? modal.title(modal) : modal.title) : "";
				const isLoading = loadingModal[modal.modalKey];
				return (
					<BntDialog
						key={modal.modalKey}
						handleClose={() => handleClose(modal.modalKey, modal.name)}
						modal={modal}
						open={Boolean(modal.modalKey)}
						preventCloseOnBackDropClick={modal.preventCloseOnBackDropClick}
						isLoading={isLoading}
						isTop={modal.isTop}
					>
						<BntModalLoader loading={isLoading} />
						<BntBox className="bnt-dialog-box" sx={isLoading ? { display: "none" } : { overflowX: "hidden" }}>
							{modal.hasTopMenu && !fullScreen ? (
								<>
									<BntStack
										className="p-3"
										direction="row"
										justifyContent="space-between"
										alignItems="center"
										sx={{ color: "success.dark" }}
									>
										<BntTypography variant="h5">{title}</BntTypography>
										<BntIconButton onClick={() => handleClose(modal.modalKey, modal.name)}>
											<CloseOutlined />
										</BntIconButton>
									</BntStack>
									<BntDivider />
								</>
							) : null}
							{modal.renderItem(modal, {
								close: () => handleClose(modal.modalKey, modal.name),
								setModalLoading: (value) => moduleSetLoading(modal.modalKey, value),
							})}
							{fullScreen && (
								<BntStack justifyContent="center">
									<BntRoundButton onClick={() => handleClose(modal.modalKey, modal.name)}>
										{t(texts_c.close)}
									</BntRoundButton>
								</BntStack>
							)}
						</BntBox>
					</BntDialog>
				);
			})}
		</>
	);
}
