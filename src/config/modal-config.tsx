import { TBntModalConfig } from "shared/types/dialog";
import { ImageModal } from "components/modals/image-modal";

export type ModalType = {
	SimpleTextModal: string;
	ImageModal: { url: string };
};

export type ModalTypeResponse = {
	SimpleTextModal: number;
	ImageModal: void;
};

export const modalConfig: TBntModalConfig<ModalType> = {
	items: {
		SimpleTextModal: {
			renderItem: (modal) => <div>{modal.data}</div>,
		},
		ImageModal: {
			renderItem: (modal) => <ImageModal url={modal.data.url} />,
		},
	},
};
