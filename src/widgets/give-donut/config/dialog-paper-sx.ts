import type { TDialogPaperSx } from "@/shared/ui/dialog";

const GIVE_DONUT_DIALOG_WIDTH = 450;
const GIVE_DONUT_DIALOG_CONTENT_MIN_HEIGHT = 400;
const GIVE_DONUT_DIALOG_CONTENT_MARGIN = 3;

export const giveDonutDialogPaperSx: TDialogPaperSx = {
	width: { sm: GIVE_DONUT_DIALOG_WIDTH },
	"& .bnt-dialog-box": {
		minHeight: GIVE_DONUT_DIALOG_CONTENT_MIN_HEIGHT,
	},
	"& .bnt-dialog-box > :last-child": {
		m: GIVE_DONUT_DIALOG_CONTENT_MARGIN,
	},
};
