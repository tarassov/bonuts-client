import { useEffect, useMemo } from "react";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";

import { useCurrentProfile } from "@/shared/model/auth";
import type { TDialogProps } from "@/shared/ui/dialog";
import { BntStack } from "@/shared/ui/stack";

import { useEmployeeLoader, useProfile } from "@/entities/profile";

import { getTopEmployeeRecognitionBadge } from "../model/employee-recognition-badge-helper";

import styles from "./modal-employee-view.module.css";
import type { TMetaItem } from "./modal-employee-view.types";
import { ModalEmployeeViewFooter } from "./modal-employee-view-footer";
import { ModalEmployeeViewHeader } from "./modal-employee-view-header";
import { ModalEmployeeViewMeta } from "./modal-employee-view-meta";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useEmployeeUi } from "@/logic/ui/use-employee-ui";
import { useTransferUi } from "@/logic/ui/use-transfer-ui";
import { useGetWeeklyRecognitionBadgesLatestQuery } from "@/services/api/bonuts-api";
import { texts_c, texts_e, texts_g, texts_o, texts_p } from "@/services/localization/texts";
import { emptyFunction } from "@/utils/empty-function";

type TModalEmployeeViewProps = {
	id: number;
};

const MAX_TAGS = 3;

export function ModalEmployeeView({ id, close = emptyFunction, setModalLoading = emptyFunction }: TModalEmployeeViewProps & TDialogProps) {
	const { isLoading, employee } = useEmployeeLoader(id);
	const { authTenant } = useProfile();
	const { profile } = useCurrentProfile();
	const { showEmployee } = useEmployeeUi(employee);
	const { showTransfer } = useTransferUi();
	const { t } = useBntTranslate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const { data: recognitionBadgesData } = useGetWeeklyRecognitionBadgesLatestQuery({ tenant: authTenant || undefined }, { skip: !authTenant || !employee?.id });

	const circles = employee?.circles ?? [];
	const visibleCircles = isMobile ? circles.slice(0, MAX_TAGS) : circles;
	const topRecognitionBadge = useMemo(() => getTopEmployeeRecognitionBadge(recognitionBadgesData?.badges || [], employee?.id), [employee?.id, recognitionBadgesData?.badges]);
	const hiddenCircleNames = isMobile
		? circles
				.slice(MAX_TAGS)
				.map((circle) => circle.name)
				.join(", ")
		: "";
	const isSelfProfile = employee?.id === profile?.id;
	const metaItems: TMetaItem[] = [];

	if (employee?.email) {
		metaItems.push({ label: t(texts_e.email_address), value: employee.email });
	}

	if (employee?.contact) {
		metaItems.push({ label: t(texts_c.contact), value: employee.contact });
	}

	useEffect(() => {
		setModalLoading(isLoading);
	}, [isLoading]);

	const handleGoToEmployeeClick = () => {
		if (!employee?.id) {
			return;
		}

		showEmployee(employee.id);
		close();
	};

	const handleTransferClick = () => {
		if (!employee?.id || isSelfProfile) {
			return;
		}

		showTransfer(employee.id);
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
			<ModalEmployeeViewHeader
				avatarUrl={employee?.user_avatar?.url}
				name={employee?.name}
				position={employee?.position}
				recognitionBadgeTitle={topRecognitionBadge?.title}
				profileFallback={t(texts_p.profile)}
				onClose={close}
			/>
			<ModalEmployeeViewMeta circles={visibleCircles} hiddenCircleNames={hiddenCircleNames} metaItems={metaItems} />
			<ModalEmployeeViewFooter
				goToLabel={t(texts_o.open_profile)}
				transferLabel={isSelfProfile ? undefined : t(texts_g.give_donuts, { capitalize: true })}
				onGoToEmployeeClick={handleGoToEmployeeClick}
				onTransferClick={isSelfProfile ? undefined : handleTransferClick}
			/>
		</BntStack>
	);
}
