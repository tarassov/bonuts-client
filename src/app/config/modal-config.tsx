import { ConfirmationModal } from "components/modals/confirmation-modal";
import { ModalAdminDeposit } from "components/modals/modal-admin-deposit/modal-admin-deposit";
import { ModalCreateCircle } from "components/modals/modal-create-circle/modal-create-circle";
import { ModalCreateDonut } from "components/modals/modal-create-donut/modal-create-donut";
import { ModalDetailedEvent } from "components/modals/modal-detailed-event/modal-detailed-event";
import { ModalEditCircle } from "components/modals/modal-edit-circle/modal-edit-circle";
import { ModalImage } from "components/modals/modal-image/modal-image";
import { CommonStrings } from "constants/dictionary";
import { texts_c, texts_g } from "services/localization/texts";

import type { TDialogConfig } from "@/shared/ui/dialog";

import type { TModalConfig } from "@/entities/modal";
import { ProfilePhotosAlbumModal } from "@/entities/profile";

import { ModalEmployeeView } from "@/features/profile/modal";
import { telegramModalConfig } from "@/features/profile/telegram";

import { giveDonutDialogPaperSx, ModalGiveDonut } from "@/widgets/give-donut";
import { ModalTransfer, transferDonutDialogPaperSx } from "@/widgets/transfer-donut";

export const modalConfig: TDialogConfig<TModalConfig> = {
	items: {
		SimpleTextModal: {
			renderItem: (modal) => <div>{modal.data}</div>,
		},
		ConfirmationModal: {
			renderItem: (modal, props) => <ConfirmationModal onSubmit={modal.data.onSubmit} text={modal.data.text} {...props} />,
			title: (data) => data.title || texts_c.confirmation,
			hasTopMenu: true,
		},
		ImageModal: {
			renderItem: (modal) => <ModalImage url={modal.data.url} />,
			title: (data) => data.title || CommonStrings.EMPTY_STRING,
			hasTopMenu: true,
		},
		ProfilePhotosAlbumModal: {
			renderItem: (modal, props) => <ProfilePhotosAlbumModal photos={modal.data.photos} initialIndex={modal.data.initialIndex} title={modal.data.title} {...props} />,
			hasTopMenu: false,
			allowFullscreen: true,
			dialogPaperSx: {
				borderRadius: { xs: 0, sm: "24px" },
				width: { xs: "100%", sm: "min(960px, calc(100% - 48px))" },
				maxWidth: "960px",
				m: { xs: 0, sm: 3 },
				backgroundImage: "none",
			},
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
			hasTopMenu: false,
			dialogPaperSx: {
				borderRadius: "20px",
				width: { xs: "calc(100% - 24px)", sm: "520px" },
				minWidth: { sm: "480px" },
				maxWidth: "520px",
			},
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
			dialogPaperSx: transferDonutDialogPaperSx,
		},
		GiveDonut: {
			renderItem: (_, props) => <ModalGiveDonut {...props} />,
			hasTopMenu: true,
			title: (data) => data.title || texts_g.give_donut_delivery_title,
			preventCloseOnBackDropClick: false,
			dialogPaperSx: giveDonutDialogPaperSx,
		},
		DetailedEvent: {
			renderItem: (modal, props) => <ModalDetailedEvent post={modal.data.post} {...props} />,
			hasTopMenu: true,
			title: (data) => data.post.title,
			getPath: (data) => `event/${data.post.id}`,
			isTop: true,
		},
		...telegramModalConfig.items,
	},
};
