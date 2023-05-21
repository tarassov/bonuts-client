import { useParams } from "react-router-dom";
import { useLoader } from "shared/loader/hooks/use-loader";
import { useEffect } from "react";
import { Modules } from "constants/modules";
import { PeopleAltOutlined, PersonOutlined } from "@mui/icons-material";
import { BntBreadcrumbs } from "shared/breadcrumb/breadcrump";
import { BntCardBody } from "shared/card/card-body";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import classNames from "classnames";
import { TBntBreadcrumpItem } from "shared/types/breadcrumbs";
import { BntCard } from "shared/card/card";
import { ImagePreview } from "shared/image/image-preview";
import { DEFAULT_AVATAR } from "constants/images";
import { BntTypography } from "shared/typography/typography";
import { useModal } from "hooks/use-modal";
import { routesPath } from "routes/config/routes-path";
import { BntRoutes } from "routes/config/routes";
import { texts_p } from "services/localization/texts/texts_p";
import { useEmployeeLogic } from "logic/hooks/employee/use-employee-logic";

export const EmployeePreview = () => {
	const { id } = useParams();
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const { setLoading } = useLoader();
	const { employee, isLoading, error } = useEmployeeLogic(id);
	const { ImageModal } = useModal();

	useEffect(() => {
		setLoading(Modules.EmployeePreview, isLoading && !error);
	}, [isLoading, error]);

	const onClick = () => {
		ImageModal.show({ url: employee?.user_avatar?.url || "" });
	};
	const breadcrumbs: Array<TBntBreadcrumpItem> = [
		{
			key: routesPath[BntRoutes.Employees],
			link: routesPath[BntRoutes.Employees],
			label: texts_p.profiles,
			icon: <PeopleAltOutlined color="info" />,
		},
		{
			key: id || "employee",
			label: employee?.user_name || "",
			icon: <PersonOutlined color="info" />,
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
								defaultImage={DEFAULT_AVATAR}
								image={employee?.user_avatar?.url}
								className="ml-10"
								onClick={onClick}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={5} lg={7} order={{ xs: 3, md: 2 }}>
							<BntTypography variant="h3" display="block">
								{employee?.user_name}
							</BntTypography>
						</Grid>
					</Grid>
				</BntCardBody>
			</BntCard>
		</>
	);
};
