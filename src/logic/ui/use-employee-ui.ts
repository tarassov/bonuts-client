import { push } from "redux-first-history";
import { useAppDispatch } from "services/redux/store/store";
import { useModal } from "hooks/use-modal";
import { CommonStrings } from "constants/dictionary";
import { texts_p } from "services/localization/texts/texts_p";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TBaseModel } from "@/types/model";

export const useEmployeeUi = (employee?: TBaseModel) => {
	const dispatch = useAppDispatch();
	const { ViewEmployee } = useModal();
	const { t } = useBntTranslate();
	const showEmployee = (id?: number) => {
		if (id || employee) dispatch(push(`/e/${id || employee?.id}`));
	};
	const showEmployeeModal = (id?: number, title?: string) => {
		if (id)
			ViewEmployee.show({
				id,
				title: title || t(texts_p.profile, { capitalize: true }) || CommonStrings.EMPTY_STRING,
			});
	};

	return { showEmployee, showEmployeeModal };
};
