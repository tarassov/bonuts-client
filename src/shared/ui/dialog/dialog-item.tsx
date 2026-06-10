import { type ContextType, useCallback, useMemo } from "react";
import { CloseOutlined } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c } from "services/localization/texts/texts_c";

import { BntBox } from "@/shared/ui/box";
import { BntRoundButton } from "@/shared/ui/buttons";
import { BntDivider } from "@/shared/ui/divider";
import { BntIconButton } from "@/shared/ui/icon-button";
import { BntModalLoader } from "@/shared/ui/loader";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { BntDialog } from "./dialog";
import { DialogCloseContext, DialogValueContext } from "./dialog-context";

export type TDialogContextModal = ContextType<typeof DialogValueContext>[number];

type TDialogItemProps = {
	fullScreen: boolean;
	handleClose: ContextType<typeof DialogCloseContext>;
	isLoading?: boolean;
	modal: TDialogContextModal;
	moduleSetLoading: (key: string, value: boolean) => void;
	title: string;
};

export function DialogItem({ fullScreen, handleClose, isLoading, modal, moduleSetLoading, title }: TDialogItemProps) {
	const { t } = useBntTranslate();

	const handleModalClose = useCallback(
		(result?: unknown) => {
			handleClose(modal.modalKey, modal.name, result);
		},
		[handleClose, modal.modalKey, modal.name]
	);

	const handleDialogClose = useCallback(() => {
		handleClose(modal.modalKey, modal.name);
	}, [handleClose, modal.modalKey, modal.name]);

	const handleModalLoading = useCallback(
		(value: boolean) => {
			moduleSetLoading(modal.modalKey, value);
		},
		[moduleSetLoading, modal.modalKey]
	);

	const dialogPaperSx = useMemo(() => {
		return {
			borderRadius: 4,
			overflow: "hidden",
			...(modal.dialogPaperSx || {}),
		};
	}, [modal.dialogPaperSx]);

	return (
		<BntDialog
			handleClose={handleDialogClose}
			modal={modal}
			open={Boolean(modal.modalKey)}
			preventCloseOnBackDropClick={modal.preventCloseOnBackDropClick}
			isLoading={isLoading}
			isTop={modal.isTop}
			slotProps={{
				paper: {
					sx: dialogPaperSx,
				},
			}}
		>
			<BntModalLoader loading={isLoading} />
			<BntBox className="bnt-dialog-box" sx={isLoading ? { display: "none" } : { overflowX: "hidden" }}>
				{modal.hasTopMenu && !fullScreen ? (
					<>
						<BntStack className="p-3" direction="row" justifyContent="space-between" alignItems="center" sx={{ color: "success.dark" }}>
							<BntTypography variant="h5">{title}</BntTypography>
							<BntIconButton onClick={handleDialogClose}>
								<CloseOutlined />
							</BntIconButton>
						</BntStack>
						<BntDivider />
					</>
				) : null}
				{modal.renderItem(modal, {
					close: handleModalClose,
					setModalLoading: handleModalLoading,
				})}
				{fullScreen && (
					<BntStack justifyContent="center">
						<BntRoundButton onClick={handleDialogClose}>{t(texts_c.close)}</BntRoundButton>
					</BntStack>
				)}
			</BntBox>
		</BntDialog>
	);
}
