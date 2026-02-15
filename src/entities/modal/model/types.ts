import { type TTelegramModalConfig, type TTelegramModalResponse } from "@/entities/telegram/@x/Modal";

import { TPost } from "@/types/model/post";

export type TModalConfig = TTelegramModalConfig & {
	SimpleTextModal: string;
	ImageModal: { url: string; title?: string };
	CreateDonut: { title?: string };
	ViewEmployee: { id: number; title?: string };
	CreateCircle: { title?: string };
	EditCircle: { title?: string; circleId: number };
	ConfirmationModal: { text: string; onSubmit: VoidFunction; title?: string };
	AdminDepositModal: { title?: string; id: number };
	TransferModal: { title?: string; id: number };
	DetailedEvent: { post: TPost };
};

export type TModalResponse = TTelegramModalResponse & {
	SimpleTextModal: string;
};

export type ModalTypeResponse = {
	SimpleTextModal: number;
	ImageModal: void;
};
