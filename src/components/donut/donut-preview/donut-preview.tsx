import { useParams } from "react-router-dom";
import { useDonutLogic } from "../../../logic/hooks/use-donut-logic";
import { useLoader } from "../../../shared/loader/hooks/use-loader";
import { useContext, useEffect } from "react";
import { Modules } from "../../../constants/modules";
import { TBntBreadcrumpItem } from "../../../shared/types/breadcrumbs";
import { Dictionary } from "../../../constants/dictionary";
import { DonutSmall, ShoppingBag } from "@mui/icons-material";
import { BntBreadcrumbs } from "../../../shared/breadcrumb/breadcrump";
import { BntCard } from "../../../shared/card/card";
import { BntCardBody } from "../../../shared/card/card-body";
import { css, Grid, useMediaQuery, useTheme } from "@mui/material";
import { ImagePreview } from "../../../shared/image/image-preview";
import { DEFAULT_DONUT_IMAGE } from "../../../constants/images";
import { BntTypography } from "../../../shared/typography/typography";
import { useBntTranslate } from "../../../hooks/use-bnt-translate";
import { DonutRemainGrey } from "./donut-remain-grey";
import { DonutPrice } from "./donut-price";
import { BntRegularButton } from "../../../shared/buttons/regular-button";
import { useRequestLogic } from "../../../logic/hooks/use-request-logic";
import classNames from "classnames";
import { BntDialogContext } from "../../../shared/modal/dialog-provider";
import { ModalNames } from "../../modals/modal-config";

export const BntDonutPreview = () => {
	const { id } = useParams();
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const { setLoading } = useLoader();
	const { donut, isLoading } = useDonutLogic(id);
	const { createRequest } = useRequestLogic();
	const { translate } = useBntTranslate();
	const showDialog = useContext(BntDialogContext);

	useEffect(() => {
		setLoading(Modules.DonutPreview, isLoading);
	}, [isLoading]);

	const onClick = () => {
		showDialog(ModalNames.SimpleText, { text: "Hey World" });
	};
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
	const onCreateRequest = () => {
		donut && createRequest({ donut });
	};

	return (
		<>
			<BntBreadcrumbs items={breadcrumbs} className={"mb-10"} />
			<BntCard>
				<BntCardBody className={"m-10 p-10"}>
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
								className={"ml-10"}
								onClick={onClick}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={5} lg={7} order={{ xs: 3, md: 2 }}>
							<BntTypography variant="h3" display="block">
								{donut?.name}
							</BntTypography>
							<BntTypography variant={"h5"}>
								{translate(Dictionary.Description)}
							</BntTypography>
							<BntTypography paragraph>{donut?.description}</BntTypography>
						</Grid>

						<Grid item xs={12} sm={4} md={3} lg={2} order={{ xs: 2, md: 3 }}>
							<BntCard raised>
								<DonutPrice className={"ml-20 mt-10"}>
									{donut?.price} {translate(Dictionary.PTS)}
								</DonutPrice>
								{donut?.on_stock && (
									<DonutRemainGrey className={"ml-20"}>
										{translate(Dictionary.On_stock)}: {donut.on_stock}
									</DonutRemainGrey>
								)}
								{donut?.on_stock == 0 && donut.supply_days && (
									<BntTypography>
										{translate(Dictionary.Delivery_days)}: {donut.supply_days}{" "}
									</BntTypography>
								)}
								{donut?.has_remains && (
									<div className={"m-20"}>
										<BntRegularButton
											onClick={onCreateRequest}
											className={"width-100"}
										>
											{translate(Dictionary.Buy)}
										</BntRegularButton>
									</div>
								)}
							</BntCard>
						</Grid>
					</Grid>
				</BntCardBody>
			</BntCard>
		</>
	);
};
