import { TBntModalConfig } from "shared/types/dialog";
import { ModalImage } from "components/modals/modal-image/modal-image";
import { texts_n } from "services/localization/texts";
import { ModalCreateDonut } from "components/modals/modal-create-donut/modal-create-donut";
import { CommonStrings } from "constants/dictionary";

export type ModalType = {
	SimpleTextModal: string;
	ImageModal: { url: string; title?: string };
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
			title: (data) => data.title || CommonStrings.EMPTY_STRING,
			hasTopMenu: true,
		},
		CreateDonut: {
			renderItem: (_, props) => <ModalCreateDonut {...props} />,
			hasTopMenu: true,
			title: texts_n.new_donut,
			preventCloseOnBackDropClick: true,
		},
	},
};
