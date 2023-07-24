import { TBntModalConfig } from "shared/types/dialog";
import { ModalImage } from "components/modals/modal-image/modal-image";
import { ModalCreateDonut } from "components/modals/modal-create-donut/modal-create-donut";
import { CommonStrings } from "constants/dictionary";
import { ModalEmployeeView } from "components/modals/modal-employee-view/modal-employee-view";
import { ModalCreateCircle } from "components/modals/modal-create-circle/modal-create-circle";
import { ConfirmationModal } from "components/modals/confirmation-modal";
import { texts_c } from "services/localization/texts";

export type ModalType = {
	SimpleTextModal: string;
	ImageModal: { url: string; title?: string };
	CreateDonut: { title?: string };
	ViewEmployee: { id: number; title?: string };
	CreateCircle: { title?: string };
	ConfirmationModal: { text: string; onSubmit: VoidFunction; title?: string };
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
		ConfirmationModal: {
			renderItem: (modal, props) => (
				<ConfirmationModal onSubmit={modal.data.onSubmit} text={modal.data.text} {...props} />
			),
			title: (data) => data.title || texts_c.confirmation,
			hasTopMenu: true,
		},

		ImageModal: {
			renderItem: (modal) => <ModalImage url={modal.data.url} />,
			title: (data) => data.title || CommonStrings.EMPTY_STRING,
			hasTopMenu: true,
		},
		CreateDonut: {
			renderItem: (_, props) => <ModalCreateDonut {...props} />,
			hasTopMenu: true,
			title: (data) => data.title || CommonStrings.EMPTY_STRING,
			preventCloseOnBackDropClick: true,
		},
		ViewEmployee: {
			renderItem: (modal, props) => <ModalEmployeeView id={modal.data?.id} {...props} />,
			title: (data) => data.title || CommonStrings.EMPTY_STRING,
			hasTopMenu: true,
		},
		CreateCircle: {
			renderItem: (_, props) => <ModalCreateCircle {...props} />,
			hasTopMenu: true,
			title: (data) => data.title || CommonStrings.EMPTY_STRING,
			preventCloseOnBackDropClick: true,
		},
	},
};
