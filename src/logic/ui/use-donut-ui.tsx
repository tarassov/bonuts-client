import { push } from "redux-first-history";
import { useAppDispatch } from "services/redux/store/store";
import { useModal } from "hooks/use-modal";
import { TBaseModel } from "@/types/model";

export const useDonutUi = (donut?: TBaseModel) => {
	const dispatch = useAppDispatch();
	const { CreateDonut } = useModal();
	const showDonut = (id?: number) => {
		if (id || donut) dispatch(push(`/d/${id || donut?.id}`));
	};

	const showCreateDonutModal = () => {
		CreateDonut.show({});
	};

	return { showDonut, showCreateDonutModal };
};
