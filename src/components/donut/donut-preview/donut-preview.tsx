import { useParams } from "react-router-dom";
import { useDonutLogic } from "../../../logic/hooks/use-donut-logic";
import { useLoader } from "../../../shared/loader/hooks/use-loader";
import { useEffect } from "react";
import { Modules } from "../../../constants/modules";
import { TBntBreadcrumpItem } from "../../../shared/types/breadcrumbs";
import { Dictionary } from "../../../constants/dictionary";
import { DonutSmall, ShoppingBag } from "@mui/icons-material";
import { BntBreadcrumbs } from "../../../shared/breadcrumb/breadcrump";
import { BntCard } from "../../../shared/card/card";
import { BntCardBody } from "../../../shared/card/card-body";
import { Grid } from "@mui/material";
import { ImagePreview } from "../../../shared/image/image-preview";
import { DEFAULT_DONUT_IMAGE } from "../../../constants/images";
import { BntTypography } from "../../../shared/typography/typography";
import { useBntTranslate } from "../../../hooks/use-bnt-translate";
import { BntTransparentButton } from "../../../shared/buttons/transparent-button";

export const BntDonutPreview = () => {
	const { id } = useParams();
	const { setLoading } = useLoader();
	const { donut, isLoading } = useDonutLogic(id);
	const { translate } = useBntTranslate();

	useEffect(() => {
		setLoading(Modules.DonutPreview, isLoading);
	}, [isLoading]);
	const breadcrumbs: Array<TBntBreadcrumpItem> = [
		{
			key: "shop",
			link: "/donuts",
			label: Dictionary.DONUTS,
			icon: <ShoppingBag color={"info"} />,
		},
		{
			key: id || "donut",
			label: donut?.name || "",
			icon: <DonutSmall color={"info"} />,
		},
	];
	return (
		<>
			<BntBreadcrumbs items={breadcrumbs} className={"mb-10"} />
			{donut !== null && donut.name}
			<BntCard>
				<BntCardBody>
					<Grid container>
						<Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
							<ImagePreview
								defaultImage={DEFAULT_DONUT_IMAGE}
								image={donut?.logo?.url}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={5} lg={6}>
							<BntTypography variant="h3" display="block">
								{donut?.name}
							</BntTypography>
							<BntTypography variant={"h5"}>
								{translate(Dictionary.Description)}
							</BntTypography>
							<BntTypography paragraph>{donut?.description}</BntTypography>
						</Grid>

						<Grid item xs={12} sm={12} md={3}>
							<BntCard raised>
								<BntTypography>
									{donut?.price} {translate(Dictionary.PTS)}
								</BntTypography>
								{donut?.on_stock && (
									<BntTypography>
										{translate(Dictionary.On_stock)}: {donut.on_stock}
									</BntTypography>
								)}
								{donut?.on_stock == 0 && donut.supply_days && (
									<BntTypography>
										{translate(Dictionary.Delivery_days)}: {donut.supply_days}{" "}
									</BntTypography>
								)}
								{donut?.has_remains && (
									<BntTransparentButton color="primary" onClick={() => {}}>
										{translate(Dictionary.Buy)}
									</BntTransparentButton>
								)}
							</BntCard>
						</Grid>
					</Grid>
				</BntCardBody>
			</BntCard>
		</>
	);
};
