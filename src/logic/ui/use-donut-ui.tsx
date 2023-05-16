import { push } from "redux-first-history";
import { useAppDispatch } from "services/redux/store/store";
import { TBaseModel } from "@/types/model";

export const useDonutUi = (donut?: TBaseModel) => {
	const dispatch = useAppDispatch();
	const showDonut = (id?: number) => {
		if (id || donut) dispatch(push(`/d/${id || donut?.id}`));
	};

	return { showDonut };
};
