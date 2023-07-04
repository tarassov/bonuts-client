import { push } from "redux-first-history";
import { useAppDispatch } from "services/redux/store/store";
import { useModal } from "hooks/use-modal";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_n } from "services/localization/texts";
import { TBaseModel } from "@/types/model";

export const useDonutUi = (donut?: TBaseModel) => {
	const dispatch = useAppDispatch();
	const { CreateDonut } = useModal();
	const { t } = useBntTranslate();
	const showDonut = (id?: number) => {
		if (id || donut) dispatch(push(`/d/${id || donut?.id}`));
	};
	const editDonut = (id?: number) => {
		if (id || donut) dispatch(push(`/donut_edit/${id || donut?.id}`));
	};

	const showCreateDonutModal = () => {
		CreateDonut.show({ title: t(texts_n.new_donut, { capitalize: true }) });
	};

	return { showDonut, editDonut, showCreateDonutModal };
};
