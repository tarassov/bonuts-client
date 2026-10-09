import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_n } from "services/localization/texts";

import { useModal } from "@/shared/lib/modal";

export const useCircleUi = () => {
	const { CreateCircle } = useModal();
	const { t } = useBntTranslate();

	const showCreateCircleModal = () => {
		CreateCircle.show({ title: t(texts_n.new_circle, { capitalize: true }) });
	};

	return { showCreateCircleModal };
};
