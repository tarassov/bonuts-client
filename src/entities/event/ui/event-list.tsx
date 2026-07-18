import { useCallback, useState } from "react";
import { InView } from "react-intersection-observer";
import { LightbulbCircleOutlined, RedeemOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid2 as Grid, useMediaQuery, useTheme } from "@mui/material";

import classnames from "classnames";

import { Dictionary } from "constants/dictionary";
import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_e, texts_g } from "services/localization/texts";

import { present } from "@/shared/lib/type-guards";
import { BntBox } from "@/shared/ui/box";
import { useLoader } from "@/shared/ui/loader";
import { SearchString } from "@/shared/ui/search-string";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useModal } from "@/entities/modal";

import { useEventListLogic } from "../model/use-event-list-logic";

import { EventCardStyled } from "./event-card-styled";
import { EventFilterMenu } from "./event-filter-menu";
import classes from "./event-list.module.scss";

export function EventList() {
	const { translate } = useBntTranslate();
	const theme = useTheme();
	const isDarkTheme = theme.palette.mode === "dark";
	const matchesDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const { GiveDonut } = useModal();
	const [searchText, setSearchText] = useState<string>();
	const [showMine, setShowMine] = useState<boolean>(false);
	const { hasNext, pages, isLoading, fetchNext, hasNew, applyUpdates } = useEventListLogic({
		showMine,
		searchText,
	});

	useLoader(Modules.Events, isLoading);

	const isEmpty = !pages[0]?.length;

	const handleShowMineToggle = () => {
		setShowMine((prev) => !prev);
	};

	const handleGiveDonutClick = () => {
		GiveDonut.show({
			title: translate(texts_g.give_donut_delivery_title, { capitalize: true }),
		});
	};

	const handleInView = useCallback(
		(inView: boolean) => {
			if (inView && !isLoading) fetchNext();
		},
		[fetchNext, isLoading]
	);

	return (
		<BntStack direction="column" className={classnames("height-100")} data-testid="dashboard-event-list">
			<BntStack
				direction={{ xs: "column", sm: "row" }}
				gap={1.5}
				alignItems={{ xs: "stretch", sm: "center" }}
				sx={{
					p: 1,
					maxWidth: 760,
					width: "100%",
					alignSelf: "center",
					borderRadius: 2,
					backgroundColor: isDarkTheme ? theme.palette.background.paper : theme.palette.common.white,
					border: `1px solid ${isDarkTheme ? theme.palette.divider : theme.palette.neutral.light}`,
					boxShadow: isDarkTheme ? "0 8px 24px rgba(0,0,0,0.28)" : "0 8px 24px rgba(30,31,37,0.05)",
				}}
			>
				<Button
					variant="contained"
					onClick={handleGiveDonutClick}
					startIcon={
						<Box
							sx={{
								width: 34,
								height: 34,
								borderRadius: "50%",
								backgroundColor: "rgba(255,255,255,.22)",
								display: "inline-flex",
								alignItems: "center",
								justifyContent: "center",
								flexShrink: 0,
							}}
						>
							<RedeemOutlined sx={{ fontSize: 21 }} />
						</Box>
					}
					sx={{
						flexShrink: 0,
						alignSelf: { xs: "stretch", sm: "center" },
						minWidth: 0,
						height: { xs: 50, sm: 50 },
						padding: "0 24px 0 15px",
						borderRadius: "14px",
						border: "none",
						display: "inline-flex",
						alignItems: "center",
						gap: "11px",
						fontFamily: "Roboto",
						fontSize: 16,
						fontWeight: 700,
						textTransform: "none",
						color: "#fff",
						background: "linear-gradient(90deg, #ff8a3d 0%, #e6ad57 100%)",
						boxShadow: "0 12px 24px rgba(255,138,61,.28)",
						transition: "transform 200ms ease, box-shadow 200ms ease, filter 200ms ease",
						"& .MuiButton-startIcon": {
							margin: 0,
						},
						"&:hover": {
							background: "linear-gradient(90deg, #ff8a3d 0%, #e6ad57 100%)",
							transform: "translateY(-2px)",
							boxShadow: "0 16px 34px rgba(255,138,61,.44)",
							filter: "brightness(1.05)",
						},
						"&:active": {
							transform: "translateY(0)",
							boxShadow: "0 10px 20px rgba(255,138,61,.24)",
							filter: "brightness(1)",
						},
						"&.Mui-disabled": {
							background: isDarkTheme ? theme.palette.grey[700] : theme.palette.grey[400],
							boxShadow: "none",
							color: "#fff",
							cursor: "default",
						},
						"@media (prefers-reduced-motion: reduce)": {
							transition: "box-shadow 200ms ease",
							"&:hover": {
								transform: "none",
								filter: "none",
							},
							"&:active": {
								transform: "none",
								filter: "none",
							},
						},
					}}
				>
					{translate(texts_g.give_donuts, { capitalize: true })}
				</Button>
				{pages.length > 0 ? (
					<>
						<BntBox sx={{ flex: 1, minWidth: 0 }}>
							<SearchString setSearch={setSearchText} debounceDelay={500} className="flex-grow" variant="surface" />
						</BntBox>
						<EventFilterMenu showMine={showMine} onShowMineToggle={handleShowMineToggle} />
					</>
				) : null}
			</BntStack>

			<BntBox className={classnames("flex-grow pb-2 mt-2", classes.scrollArea, { scroll: !isEmpty })} sx={{ overflowY: matchesDownMd && isEmpty ? "hidden" : undefined }}>
				{hasNew && <Button onClick={applyUpdates}>{Dictionary.REFRESH}</Button>}
				<Grid container rowSpacing={{ xs: 2 }} justifyContent="center">
					{present(pages) &&
						Object.values(pages).map((page) => {
							return (
								page &&
								page.map((post) => {
									return (
										<Grid key={post.id} size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
											<EventCardStyled post={post} maxWidth={760} />
										</Grid>
									);
								})
							);
						})}
				</Grid>
				{isEmpty ? (
					<BntStack
						alignItems="center"
						justifyContent="center"
						sx={{
							height: matchesDownMd ? "300px" : "40%",
							overflowY: matchesDownMd ? "hidden" : undefined,
						}}
					>
						<LightbulbCircleOutlined sx={{ height: "100px", width: "100px" }} />
						<BntTypography>{translate(texts_e.empty_events_placeholder, { capitalize: true })}</BntTypography>
					</BntStack>
				) : null}
				{hasNext && pages.length > 0 && (
					<BntStack alignItems="center" justifyContent="center" className="pt-2 overflow-hidden">
						<InView as="div" onChange={handleInView}>
							<CircularProgress color="primary" />
						</InView>
					</BntStack>
				)}
			</BntBox>
		</BntStack>
	);
}
