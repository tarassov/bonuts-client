import { ConfirmationModal } from "components/modals/confirmation-modal";
import { ModalAdminDeposit } from "components/modals/modal-admin-deposit/modal-admin-deposit";
import { ModalCreateCircle, type TCreateCircleResult } from "components/modals/modal-create-circle/modal-create-circle";
import { ModalCreateDonut, type TCreateDonutResult } from "components/modals/modal-create-donut/modal-create-donut";
import { ModalDetailedEvent } from "components/modals/modal-detailed-event/modal-detailed-event";
import { ModalEditCircle, type TEditCircleResult } from "components/modals/modal-edit-circle/modal-edit-circle";
import { ModalImage } from "components/modals/modal-image/modal-image";
import { CommonStrings } from "constants/dictionary";

import { defineModal } from "@/shared/ui/dialog";

import { ProfilePhotosAlbumModal, photosAlbumDialogPaperSx } from "@/entities/profile";

import { ModalEmployeeView } from "@/features/profile/modal";
import { telegramModalConfig } from "@/features/profile/telegram";

import { giveDonutDialogPaperSx, ModalGiveDonut } from "@/widgets/give-donut";
import { ModalTransfer, transferDonutDialogPaperSx } from "@/widgets/transfer-donut";

import type { TPicture } from "@/types/model/picture";
import { TPost } from "@/types/model/post";

// Every caller passes an already localized title, the fallback only keeps the header empty.
const titleFromData = (data: { title?: string }) => data.title || CommonStrings.EMPTY_STRING;

export const modalConfig = {
	items: {
		SimpleTextModal: defineModal<string>({
			renderItem: (modal) => <div>{modal.data}</div>,
		}),
		ConfirmationModal: defineModal<{ text: string; onSubmit: VoidFunction; title?: string }>({
			renderItem: (modal, props) => <ConfirmationModal onSubmit={modal.data.onSubmit} text={modal.data.text} {...props} />,
			title: titleFromData,
			hasTopMenu: true,
			closeOnBack: true,
		}),
		ImageModal: defineModal<{ url: string; title?: string }>({
			renderItem: (modal) => <ModalImage url={modal.data.url} />,
			title: titleFromData,
			hasTopMenu: true,
			closeOnBack: true,
		}),
		ProfilePhotosAlbumModal: defineModal<{ photos: Array<TPicture>; initialIndex?: number; title?: string }>({
			renderItem: (modal, props) => <ProfilePhotosAlbumModal photos={modal.data.photos} initialIndex={modal.data.initialIndex} title={modal.data.title} {...props} />,
			hasTopMenu: false,
			allowFullscreen: true,
			dialogPaperSx: photosAlbumDialogPaperSx,
			closeOnBack: true,
		}),
		CreateDonut: defineModal<{ title?: string }, TCreateDonutResult>({
			renderItem: (_, props) => <ModalCreateDonut {...props} />,
			hasTopMenu: true,
			title: titleFromData,
			preventCloseOnBackDropClick: true,
			closeOnBack: true,
		}),
		ViewEmployee: defineModal<{ id: number; title?: string }>({
			renderItem: (modal, props) => <ModalEmployeeView id={modal.data.id} {...props} />,
			title: titleFromData,
			hasTopMenu: false,
			dialogPaperSx: {
				borderRadius: "20px",
				width: { xs: "calc(100% - 24px)", sm: "520px" },
				minWidth: { sm: "480px" },
				maxWidth: "520px",
			},
			closeOnBack: true,
		}),
		CreateCircle: defineModal<{ title?: string }, TCreateCircleResult>({
			renderItem: (_, props) => <ModalCreateCircle {...props} />,
			hasTopMenu: true,
			title: titleFromData,
			preventCloseOnBackDropClick: true,
			closeOnBack: true,
		}),
		EditCircle: defineModal<{ title?: string; circleId: number }, TEditCircleResult>({
			renderItem: (modal, props) => <ModalEditCircle {...props} circleId={modal.data.circleId} />,
			hasTopMenu: true,
			title: titleFromData,
			preventCloseOnBackDropClick: true,
			closeOnBack: true,
		}),
		AdminDepositModal: defineModal<{ title?: string; id: number }>({
			renderItem: (modal, props) => <ModalAdminDeposit id={modal.data.id} {...props} />,
			hasTopMenu: true,
			title: titleFromData,
			preventCloseOnBackDropClick: true,
			closeOnBack: true,
		}),
		TransferModal: defineModal<{ title?: string; id: number }>({
			renderItem: (modal, props) => <ModalTransfer id={modal.data.id} {...props} />,
			hasTopMenu: true,
			title: titleFromData,
			preventCloseOnBackDropClick: true,
			dialogPaperSx: transferDonutDialogPaperSx,
			closeOnBack: true,
		}),
		GiveDonut: defineModal<{ title?: string }>({
			renderItem: (_, props) => <ModalGiveDonut {...props} />,
			hasTopMenu: true,
			title: titleFromData,
			preventCloseOnBackDropClick: false,
			dialogPaperSx: giveDonutDialogPaperSx,
			closeOnBack: true,
		}),
		DetailedEvent: defineModal<{ post: TPost }>({
			renderItem: (modal, props) => <ModalDetailedEvent post={modal.data.post} {...props} />,
			hasTopMenu: true,
			title: (data) => data.post.title,
			getPath: (data) => `event/${data.post.id}`,
			isTop: true,
		}),
		...telegramModalConfig.items,
	},
};

export type TModalItems = typeof modalConfig.items;

// Makes every modal declared above known to useModal() across the whole application.
declare module "@/shared/ui/dialog/modal-registry" {
	interface BntModalRegistry extends TModalItems {}
}
