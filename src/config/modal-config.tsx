import { TBntModalConfig } from "shared/types/dialog";
import { ModalImage } from "components/modals/modal-image/modal-image";

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
			renderItem: (modal) => <ModalImage url={modal.data.url} />,
			hasTopMenu: true,
		},
	},
};
