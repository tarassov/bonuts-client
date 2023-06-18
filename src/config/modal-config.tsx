import { TBntModalConfig } from "shared/types/dialog";
import { ModalImage } from "components/modals/modal-image/modal-image";
import { ModalCreateDonut } from "components/modals/modal-create-donut/modal-create-donut";

export type ModalType = {
	SimpleTextModal: string;
	ImageModal: { url: string };
	CreateDonut: {};
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
		CreateDonut: {
			renderItem: () => <ModalCreateDonut />,
			hasTopMenu: true,
			preventCloseOnBackDropClick: true,
		},
	},
};
