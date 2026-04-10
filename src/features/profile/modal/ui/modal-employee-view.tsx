import { useEffect } from "react";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";

import type { TDialogProps } from "@/shared/ui/dialog";
import { BntStack } from "@/shared/ui/stack";

import { useEmployeeLoader } from "@/entities/profile";

import styles from "./modal-employee-view.module.css";
import type { TMetaItem } from "./modal-employee-view.types";
import { ModalEmployeeViewFooter } from "./modal-employee-view-footer";
import { ModalEmployeeViewHeader } from "./modal-employee-view-header";
import { ModalEmployeeViewMeta } from "./modal-employee-view-meta";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useEmployeeUi } from "@/logic/ui/use-employee-ui";
import { texts_c, texts_e, texts_g, texts_p } from "@/services/localization/texts";
import { emptyFunction } from "@/utils/empty-function";

type TModalEmployeeViewProps = {
	id: number;
};

const MAX_TAGS = 3;

export function ModalEmployeeView({ id, close = emptyFunction, setModalLoading = emptyFunction }: TModalEmployeeViewProps & TDialogProps) {
	const { isLoading, employee } = useEmployeeLoader(id);
	const { showEmployee } = useEmployeeUi(employee);
	const { t } = useBntTranslate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const circles = employee?.circles ?? [];
	const visibleCircles = isMobile ? circles.slice(0, MAX_TAGS) : circles;
	const hiddenCircleNames = isMobile
		? circles
				.slice(MAX_TAGS)
				.map((circle) => circle.name)
				.join(", ")
		: "";
	const metaItems: TMetaItem[] = [];

	if (employee?.email) {
		metaItems.push({ label: t(texts_e.email_address), value: employee.email });
	}

	if (employee?.contact) {
		metaItems.push({ label: t(texts_c.contact), value: employee.contact });
	}

	useEffect(() => {
		setModalLoading(isLoading);
	}, [isLoading, setModalLoading]);

	const handleGoToEmployeeClick = () => {
		if (!employee?.id) {
			return;
		}

		showEmployee(employee.id);
		close();
	};

	if (isLoading) {
		return (
			<BntStack className={styles.loadingContainer} justifyContent="center" alignItems="center">
				<CircularProgress color="inherit" />
			</BntStack>
		);
	}

	return (
		<BntStack className={styles.container}>
			<ModalEmployeeViewHeader avatarUrl={employee?.user_avatar?.url} name={employee?.name} position={employee?.position} profileFallback={t(texts_p.profile)} onClose={close} />
			<ModalEmployeeViewMeta metaItems={metaItems} circles={visibleCircles} hiddenCircleNames={hiddenCircleNames} />
			<ModalEmployeeViewFooter goToLabel={t(texts_g.go_to)} onGoToEmployeeClick={handleGoToEmployeeClick} />
		</BntStack>
	);
}
