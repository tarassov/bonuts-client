import { useParams } from "react-router-dom";
import { DonutSmall, ShoppingBag } from "@mui/icons-material";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import classNames from "classnames";
import { BntRoutes } from "routes/config/routes";
import { routesPath } from "routes/config/routes-path";
import { TBntBreadcrumbItem } from "shared/ui/types/breadcrumbs-types";

import { BntBreadcrumbs } from "shared/ui/breadcrumb/breadcrumbs";
import { BntCard } from "shared/ui/card/card";
import { BntCardBody } from "shared/ui/card/card-body";
import { ImagePreview } from "shared/ui/image/image-preview";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { BntTypography } from "shared/ui/typography/typography";

import { Dictionary } from "constants/dictionary";
import { DEFAULT_DONUT_IMAGE } from "constants/images";
import { Modules } from "constants/modules";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useModal } from "hooks/use-modal";

import { DonutPurchaseBlock } from "./donut-purchase-block";

import { useDonutLoader } from "@/entities/donut";

export function BntDonutPreview() {
	const { id } = useParams();
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	const { donut, isLoading } = useDonutLoader(id);
	const { translate } = useBntTranslate();
	const { ImageModal } = useModal();

	useLoader(Modules.DonutPreview, isLoading);

	const onClick = () => {
		ImageModal.show({ url: donut?.logo?.url || DEFAULT_DONUT_IMAGE, title: donut?.name });
	};
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: routesPath[BntRoutes.Donuts],
			link: routesPath[BntRoutes.Donuts],
			label: Dictionary.DONUTS,
			icon: <ShoppingBag />,
		},
		{
			key: id || "donut",
			label: donut?.name || "",
			icon: <DonutSmall />,
		},
	];

	return (
		<>
			<BntBreadcrumbs items={breadcrumbs} className="mb-3" />
			<BntCard>
				<BntCardBody className="m-3 p-3">
					<Grid container justifyContent="space-between">
						<Grid
							item
							xs={12}
							sm={8}
							md={4}
							lg={3}
							xl={2}
							className={classNames("", { "text-align-center": matchesDownSm })}
						>
							<ImagePreview
								defaultImage={donut?.logo?.url ? undefined : DEFAULT_DONUT_IMAGE}
								image={donut?.logo?.url}
								className="ml-3"
								onClick={onClick}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={5} lg={7} order={{ xs: 3, md: 2 }}>
							<BntTypography sx={{ overflowWrap: "break-word" }} variant="h5" display="block">
								{donut?.name}
							</BntTypography>
							<BntTypography className="mb-2 mt-2" variant="subtitle2">
								{translate(Dictionary.Description)}
							</BntTypography>
							<BntTypography paragraph isPreformatted>
								{donut?.description}
							</BntTypography>
						</Grid>

						<Grid item xs={12} sm={4} md={3} lg={2} order={{ xs: 2, md: 3 }}>
							{donut && <DonutPurchaseBlock donut={donut} />}
						</Grid>
					</Grid>
				</BntCardBody>
			</BntCard>
		</>
	);
}
