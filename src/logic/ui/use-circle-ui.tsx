import { useModal } from "hooks/use-modal";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_n } from "services/localization/texts";

export const useCircleUi = () => {
	const { CreateCircle } = useModal();
	const { t } = useBntTranslate();

	const showCreateCircleModal = () => {
		CreateCircle.show({ title: t(texts_n.new_circle, { capitalize: true }) });
	};

	return { showCreateCircleModal };
};
