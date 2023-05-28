import { FC } from "react";
import { BntCardBody } from "shared/card/card-body";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import classNames from "classnames";
import { BntCard } from "shared/card/card";
import { ImagePreview } from "shared/image/image-preview";
import { DEFAULT_AVATAR } from "constants/images";
import { BntTypography } from "shared/typography/typography";
import { emptyFunction } from "utils/empty-function";
import { EmployeePreviewBreadcrumbs } from "components/employee/employee-preview/employee-preview-breadcrumbs";
import { TProfile } from "@/types/model";

type EmployeePreviewPureProps = {
	employee?: TProfile;
	onImageClick: VoidFunction;
};
export const EmployeePreviewPure: FC<EmployeePreviewPureProps> = ({
	employee,
	onImageClick = emptyFunction,
}) => {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<EmployeePreviewBreadcrumbs employee={employee} />
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
								onClick={onImageClick}
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
