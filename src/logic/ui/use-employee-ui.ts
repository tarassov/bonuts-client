import { push } from "redux-first-history";
import { useAppDispatch } from "services/redux/store/store";
import { TBaseModel } from "@/types/model";

export const useEmployeeUi = (employee?: TBaseModel) => {
	const dispatch = useAppDispatch();
	const showEmployee = (id?: number) => {
		if (id || employee) dispatch(push(`/e/${id || employee?.id}`));
	};

	return { showEmployee };
};
