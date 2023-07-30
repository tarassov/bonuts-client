import { push } from "redux-first-history";
import { useAppDispatch } from "services/redux/store/store";
import { useModal } from "hooks/use-modal";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_n } from "services/localization/texts";
import { routesPath } from "routes/config/routes-path";
import { BntRoutes } from "routes/config/routes";
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

	const toStore = () => {
		dispatch(push(routesPath[BntRoutes.Donuts]));
	};

	const showCreateDonutModal = () => {
		CreateDonut.show({ title: t(texts_n.new_donut, { capitalize: true }) });
	};

	return { showDonut, editDonut, showCreateDonutModal, toStore };
};
