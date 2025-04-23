import { TBntModalConfig } from "shared/ui/types/dialog-types";
import { ModalImage } from "components/modals/modal-image/modal-image";
import { ModalCreateDonut } from "components/modals/modal-create-donut/modal-create-donut";
import { CommonStrings } from "constants/dictionary";
import { ModalEmployeeView } from "components/modals/modal-employee-view/modal-employee-view";
import { ModalCreateCircle } from "components/modals/modal-create-circle/modal-create-circle";
import { ConfirmationModal } from "components/modals/confirmation-modal";
import { texts_c } from "services/localization/texts";
import { ModalEditCircle } from "components/modals/modal-edit-circle/modal-edit-circle";
import { ModalAdminDeposit } from "components/modals/modal-admin-deposit/modal-admin-deposit";
import { ModalTransfer } from "components/modals/modal-transfer/modal-transfer";
import { ModalDetailedEvent } from "components/modals/modal-detailed-event/modal-detailed-event";
import { TPost } from "@/types/model/post";
import {
	IntegrationModalType,
	integrationsModalConfig,
} from "@/widgets/integration-settings/ui/integrations-modal-config";

export type ModalType = IntegrationModalType & {
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
		EditCircle: {
			renderItem: (modal, props) => <ModalEditCircle {...props} circleId={modal.data.circleId} />,
			hasTopMenu: true,
			title: (data) => data.title || CommonStrings.EMPTY_STRING,
			preventCloseOnBackDropClick: true,
		},
		AdminDepositModal: {
			renderItem: (modal, props) => <ModalAdminDeposit id={modal.data.id} {...props} />,
			hasTopMenu: true,
			title: (data) => data.title || "admin deposit",
			preventCloseOnBackDropClick: true,
		},
		TransferModal: {
			renderItem: (modal, props) => <ModalTransfer id={modal.data.id} {...props} />,
			hasTopMenu: true,
			title: (data) => data.title || "Transfer",
			preventCloseOnBackDropClick: true,
		},
		DetailedEvent: {
			renderItem: (modal, props) => <ModalDetailedEvent post={modal.data.post} {...props} />,
			hasTopMenu: true,
			title: (data) => data.post.title,
			getPath: (data) => `event/${data.post.id}`,
			isTop: true,
		},
		...integrationsModalConfig.items,
	},
};
