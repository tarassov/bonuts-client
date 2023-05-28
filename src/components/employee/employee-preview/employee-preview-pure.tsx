import { FC } from "react";
import { BntCardBody } from "shared/card/card-body";
import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import classNames from "classnames";
import { BntCard } from "shared/card/card";
import { ImagePreview } from "shared/image/image-preview";
import { DEFAULT_AVATAR } from "constants/images";
import { BntTypography } from "shared/typography/typography";
import { emptyFunction } from "utils/empty-function";
import { EmployeePreviewBreadcrumbs } from "components/employee/employee-preview/employee-preview-breadcrumbs";
import { BntChip } from "shared/chip/chip";
import { ErrorOutline, ShieldOutlined, StorefrontOutlined } from "@mui/icons-material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a } from "services/localization/texts/texts_a";
import { texts_n } from "services/localization/texts/texts_n";
import { texts_s } from "services/localization/texts/texts_s";
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
	const { translate } = useBntTranslate();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<EmployeePreviewBreadcrumbs employee={employee} />
			<BntCard>
				<BntCardBody className="m-10 p-10">
					<Grid container justifyItems="flex-start">
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
							<Stack direction="row" alignItems="center" spacing={2}>
								<BntTypography variant="h3" display="block">
									{employee?.user_name}
								</BntTypography>
								<Stack direction={{ sm: "column", md: "row", xs: "column" }} spacing={2}>
									{employee?.admin && (
										<BntChip
											color="primary"
											icon={<ShieldOutlined />}
											label={translate(texts_a.admin)}
										/>
									)}
									{employee && !employee?.active && (
										<BntChip
											color="error"
											icon={<ErrorOutline />}
											label={translate(texts_n.not_active)}
										/>
									)}
									{employee?.store_admin && (
										<BntChip
											color="warning"
											icon={<StorefrontOutlined />}
											label={translate(texts_s.store_admin)}
										/>
									)}
								</Stack>
							</Stack>
						</Grid>
					</Grid>
				</BntCardBody>
			</BntCard>
		</>
	);
};
