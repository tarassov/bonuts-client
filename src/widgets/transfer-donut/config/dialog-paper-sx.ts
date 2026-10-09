import type { TDialogPaperSx } from "@/shared/ui/dialog";

const TRANSFER_DONUT_DIALOG_WIDTH = 450;
const TRANSFER_DONUT_DIALOG_CONTENT_MIN_HEIGHT = 400;
const TRANSFER_DONUT_DIALOG_CONTENT_MARGIN = 3;

export const transferDonutDialogPaperSx: TDialogPaperSx = {
	width: { sm: TRANSFER_DONUT_DIALOG_WIDTH },
	"& .bnt-dialog-box": {
		minHeight: TRANSFER_DONUT_DIALOG_CONTENT_MIN_HEIGHT,
	},
	"& .bnt-dialog-box > :last-child": {
		m: TRANSFER_DONUT_DIALOG_CONTENT_MARGIN,
	},
};
