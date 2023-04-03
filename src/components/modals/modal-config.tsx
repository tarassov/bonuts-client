import { TBntModalConfig } from "../../shared/types/dialog";
import { TextModal } from "./text-modal";

export enum ModalNames {
	SimpleText = "SimpleText",
}

export const modalConfig: TBntModalConfig = {
	items: {
		[ModalNames.SimpleText]: {
			key: ModalNames.SimpleText,
			renderItem: (modal) => {
				return <TextModal modal={modal} />;
			},
		},
	},
};
