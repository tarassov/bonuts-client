import { push } from "redux-first-history";

import { CommonStrings } from "constants/dictionary";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_p } from "services/localization/texts/texts_p";
import { useAppDispatch } from "services/redux/store/store";

import { BntRoutes } from "@/shared/config/routes";

import { useModal } from "@/entities/modal";

import { routesPath } from "routes/config/routes-path";
import { TProfile } from "@/types/model";

export const useEmployeeUi = (employee?: TProfile) => {
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

	const toEmployeeList = () => {
		dispatch(push(routesPath[BntRoutes.Employees]));
	};

	const toDistribBalanceHistory = () => {
		const account_id = employee?.distrib_account?.id;
		if (account_id) {
			dispatch(push(routesPath[BntRoutes.AccountOperations].replace(":id", account_id.toString())));
		} else {
			console.warn("Account id was not found in employee", employee);
		}
	};
	const toSelfBalanceHistory = () => {
		const account_id = employee?.self_account?.id;
		if (account_id) {
			dispatch(push(routesPath[BntRoutes.AccountOperations].replace(":id", account_id.toString())));
		} else {
			console.warn("Account id was not found in employee", employee);
		}
	};
	return {
		showEmployee,
		showEmployeeModal,
		toEmployeeList,
		toDistribBalanceHistory,
		toSelfBalanceHistory,
	};
};
