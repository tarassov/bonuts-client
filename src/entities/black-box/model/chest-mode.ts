import blackBoxTexts from "../config/black-box-texts";

/** Closing hides a new anonymous question in the box; opening shows an answered one to the team. */
export enum ChestMode {
	Close = "close",
	Open = "open",
}

type TChestModeMeta = { title: blackBoxTexts; caption: blackBoxTexts; cardLabel: blackBoxTexts };

export const CHEST_MODE_META: Record<ChestMode, TChestModeMeta> = {
	[ChestMode.Close]: { title: blackBoxTexts.chest_closed_title, caption: blackBoxTexts.chest_closed_caption, cardLabel: blackBoxTexts.chest_card_anonymous },
	[ChestMode.Open]: { title: blackBoxTexts.chest_open_title, caption: blackBoxTexts.chest_open_caption, cardLabel: blackBoxTexts.status_published },
};
