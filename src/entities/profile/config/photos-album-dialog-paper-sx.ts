import type { TDialogPaperSx } from "@/shared/ui/dialog";

export const photosAlbumDialogPaperSx: TDialogPaperSx = {
	borderRadius: { xs: 0, sm: "24px" },
	width: { xs: "100%", sm: "calc(100% - 48px)" },
	height: { xs: "100%", sm: "calc(100% - 48px)" },
	maxWidth: "1440px",
	maxHeight: "960px",
	m: { xs: 0, sm: 3 },
	backgroundImage: "none",
	"& .bnt-dialog-box": {
		height: "100%",
		minHeight: 0,
	},
};
