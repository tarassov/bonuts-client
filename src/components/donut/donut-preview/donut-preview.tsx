import { useParams } from "react-router-dom";
import { useLoader } from "shared/loader/hooks/use-loader";
import { useEffect } from "react";
import { Modules } from "constants/modules";
import { DonutSmall, ShoppingBag } from "@mui/icons-material";
import { BntBreadcrumbs } from "shared/breadcrumb/breadcrump";
import { BntCardBody } from "shared/card/card-body";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import classNames from "classnames";
import { useDonutLogic } from "logic/hooks/donut/use-donut-logic";
import { TBntBreadcrumpItem } from "shared/types/breadcrumbs";
import { Dictionary } from "constants/dictionary";
import { BntCard } from "shared/card/card";
import { ImagePreview } from "shared/image/image-preview";
import { DEFAULT_DONUT_IMAGE } from "constants/images";
import { BntTypography } from "shared/typography/typography";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useModal } from "hooks/use-modal";
import { DonutPurchaseBlock } from "./donut-purchase-block";

export const BntDonutPreview = () => {
	const { id } = useParams();
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const { setLoading } = useLoader();
	const { donut, isLoading } = useDonutLogic(id);
	const { translate } = useBntTranslate();
	const { ImageModal } = useModal();

	useEffect(() => {
		setLoading(Modules.DonutPreview, isLoading);
	}, [isLoading]);

	const onClick = () => {
		ImageModal.show({ url: donut?.logo?.url || "" });
	};
	const breadcrumbs: Array<TBntBreadcrumpItem> = [
		{
			key: "shop",
			link: "/donuts",
			label: Dictionary.DONUTS,
			icon: <ShoppingBag color="info" />,
		},
		{
			key: id || "donut",
			label: donut?.name || "",
			icon: <DonutSmall color="info" />,
		},
	];

	return (
		<>
			<BntBreadcrumbs items={breadcrumbs} className="mb-10" />
			<BntCard>
				<BntCardBody className="m-10 p-10">
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
								defaultImage={DEFAULT_DONUT_IMAGE}
								image={donut?.logo?.url}
								className="ml-10"
								onClick={onClick}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={5} lg={7} order={{ xs: 3, md: 2 }}>
							<BntTypography variant="h3" display="block">
								{donut?.name}
							</BntTypography>
							<BntTypography variant="h5">{translate(Dictionary.Description)}</BntTypography>
							<BntTypography paragraph>{donut?.description}</BntTypography>
						</Grid>

						<Grid item xs={12} sm={4} md={3} lg={2} order={{ xs: 2, md: 3 }}>
							{donut && <DonutPurchaseBlock donut={donut} />}
						</Grid>
					</Grid>
				</BntCardBody>
			</BntCard>
		</>
	);
};