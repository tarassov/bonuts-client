import type { TDialogPaperSx } from "@/shared/ui/dialog";

const TRANSFER_DONUT_DIALOG_WIDTH = 450;
const TRANSFER_DONUT_DIALOG_CONTENT_MIN_HEIGHT = 400;

export const transferDonutDialogPaperSx: TDialogPaperSx = {
	width: { sm: TRANSFER_DONUT_DIALOG_WIDTH },
	"& .bnt-dialog-box": {
		minHeight: TRANSFER_DONUT_DIALOG_CONTENT_MIN_HEIGHT,
	},
};
