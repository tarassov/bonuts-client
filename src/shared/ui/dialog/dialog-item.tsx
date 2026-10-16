import { type ContextType, useCallback, useMemo } from "react";
import { CloseOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

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
import { DialogCloseContext } from "./dialog-context";
import type { TModalRecord } from "./dialog-types";

type TDialogItemProps = {
	fullScreen: boolean;
	handleClose: ContextType<typeof DialogCloseContext>;
	isLoading?: boolean;
	modal: TModalRecord;
	moduleSetLoading: (key: string, value: boolean) => void;
	removeModal: (key: string) => void;
};

const DialogHeader = styled(BntStack)(({ theme }) => ({
	padding: theme.spacing(2.5, 3),
	color: theme.palette.text.primary,
}));

const DialogHeaderTitle = styled(BntTypography)(({ theme }) => ({
	flex: 1,
	minWidth: 0,
	fontWeight: 600,
	lineHeight: 1.3,
	color: theme.palette.text.primary,
}));

const DialogHeaderCloseButton = styled(BntIconButton)(({ theme }) => ({
	marginRight: theme.spacing(-0.5),
	color: theme.palette.text.secondary,
}));

export function DialogItem({ fullScreen, handleClose, isLoading, modal, moduleSetLoading, removeModal }: TDialogItemProps) {
	const { t } = useBntTranslate();
	const isFullscreenDialog = fullScreen && modal.allowFullscreen && !isLoading;
	const hasTopMenu = modal.hasTopMenu && !isFullscreenDialog;

	const handleModalClose = useCallback(
		(result?: unknown) => {
			handleClose(modal.modalKey, result);
		},
		[handleClose, modal.modalKey]
	);

	const handleDialogClose = useCallback(() => {
		handleClose(modal.modalKey);
	}, [handleClose, modal.modalKey]);

	// The record is dropped only here, so the dialog gets to play its exit transition first.
	const handleExited = useCallback(() => {
		removeModal(modal.modalKey);
	}, [removeModal, modal.modalKey]);

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
			fullScreen={isFullscreenDialog}
			open={!modal.isClosing}
			TransitionProps={{ onExited: handleExited }}
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
				{hasTopMenu ? (
					<>
						<DialogHeader direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
							<DialogHeaderTitle variant="h6">{modal.title}</DialogHeaderTitle>
							<DialogHeaderCloseButton aria-label={t(texts_c.close)} onClick={handleDialogClose}>
								<CloseOutlined />
							</DialogHeaderCloseButton>
						</DialogHeader>
						<BntDivider />
					</>
				) : null}
				{modal.renderItem(modal, {
					close: handleModalClose,
					setModalLoading: handleModalLoading,
				})}
				{isFullscreenDialog && (
					<BntStack justifyContent="center">
						<BntRoundButton onClick={handleDialogClose}>{t(texts_c.close)}</BntRoundButton>
					</BntStack>
				)}
			</BntBox>
		</BntDialog>
	);
}
