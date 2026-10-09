import { useParams } from "react-router-dom";
import { DonutSmall } from "@mui/icons-material";

import { Modules } from "constants/modules";
import type { PutDonutsByIdApiResponse } from "services/api/bonuts-api";

import { BntRoutes } from "@/shared/config/routes";
import { useBntRoutes } from "@/shared/lib/router";
import { BntBreadcrumbs } from "@/shared/ui/breadcrumb";
import { useLoader } from "@/shared/ui/loader";
import { BntStack } from "@/shared/ui/stack";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";
import { BntTypography } from "@/shared/ui/typography";

import { useDonut, useDonutLoader } from "@/entities/donut";

import { DonutEditForm } from "./donut-edit-form";
import styles from "./donut-edit-page.module.scss";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_e, texts_s } from "@/services/localization/texts";
import type { TDonut } from "@/types/model";

export function DonutEditPage() {
	const { id } = useParams();

	const { donut, isLoading, refetch } = useDonutLoader(id);
	const { putDonut, isUpdating } = useDonut();
	const { t } = useBntTranslate();
	const { routes } = useBntRoutes();
	const settingsRoute = routes[BntRoutes.Settings];
	const storeRoute = settingsRoute?.children?.Store;

	useLoader(Modules.DonutPreview, isLoading || isUpdating);

	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: settingsRoute?.path,
			label: settingsRoute?.navbarName || texts_s.settings,
			icon: settingsRoute?.icon,
		},
		{
			key: storeRoute?.path || "store",
			link: storeRoute?.path,
			label: storeRoute?.navbarName || texts_s.store_showcase,
			icon: storeRoute?.icon,
		},
		{
			key: id || "donut",
			label: donut?.name || "",
			icon: <DonutSmall />,
		},
	];

	const onSubmit = (values: TDonut): Promise<{ data: PutDonutsByIdApiResponse } | { error: FetchBaseQueryError | SerializedError } | undefined> | undefined => {
		if (donut) {
			return putDonut(donut?.id, { ...values }, { onSuccess: () => refetch() });
		}
		return undefined;
	};
	const handleImageChange = (file: File) => {
		if (!donut) return;

		putDonut(donut.id, { ...donut, logo: file }, { onSuccess: () => refetch() });
	};
	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<BntBreadcrumbs items={breadcrumbs} />
			<div className="flex-grow scroll">
				<main className={styles.page}>
					<header className={styles.header}>
						<BntTypography as="h1" className={styles.title}>
							{t(texts_e.edit_reward)}
						</BntTypography>
						<BntTypography as="p" color="text.secondary">
							{t(texts_e.edit_reward_description)}
						</BntTypography>
					</header>
					<div className={styles.formLayout}>{donut ? <DonutEditForm donut={donut} onImageChange={handleImageChange} onSubmit={onSubmit} /> : null}</div>
				</main>
			</div>
		</BntStack>
	);
}
