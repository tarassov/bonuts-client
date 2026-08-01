import { useCallback } from "react";

import { CommonStrings } from "constants/dictionary";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_p } from "services/localization/texts/texts_p";

import { BntRoutes } from "@/shared/config/routes";
import { useModal } from "@/shared/lib/modal";
import { useAppNavigate } from "@/shared/lib/navigation";
import { ESeverity, useNotification } from "@/shared/ui/notification";

import { AccountType } from "@/entities/account";

import { routesPath } from "routes/config/routes-path";
import type { TProfile } from "@/types/model";

export const useEmployeeUi = (employee?: TProfile) => {
	const { ViewEmployee } = useModal();
	const { navigate, navigateWithSearchParams } = useAppNavigate();
	const { t } = useBntTranslate();
	const { showNotification } = useNotification();
	const showEmployee = (id?: number) => {
		if (id || employee) navigate(`/e/${id || employee?.id}`);
	};
	const showEmployeeModal = (id?: number, title?: string) => {
		if (id)
			ViewEmployee.show({
				id,
				title: title || t(texts_p.profile, { capitalize: true }) || CommonStrings.EMPTY_STRING,
			});
	};

	const toEmployeeList = () => {
		navigate(routesPath[BntRoutes.Employees]);
	};

	const toAccountOperations = useCallback(
		(accountType?: AccountType) => {
			if (employee?.id) {
				const path = routesPath[BntRoutes.AccountOperations].replace(":id", employee.id.toString());
				navigateWithSearchParams(path, { accountType });
			} else {
				showNotification(texts_p.profile_not_found, ESeverity.Warning);
			}
		},
		[employee?.id, navigateWithSearchParams, showNotification]
	);

	return {
		showEmployee,
		showEmployeeModal,
		toEmployeeList,
		toAccountOperations,
	};
};
