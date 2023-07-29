import React, { FC } from "react";
import { BntCardBody } from "shared/card/card-body";
import { Grid, Stack, useMediaQuery, useTheme, Box } from "@mui/material";
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
import { BntLabel } from "components/employee/employee-preview/label";
import { formatStringDate } from "utils/format-string-date";
import { BntDivider } from "shared/divider/bnt-divider";
import { EmployeeActions } from "pages/employee/employee-actions";
import { TProfile } from "@/types/model";
import {
	texts_a,
	texts_b,
	texts_c,
	texts_i,
	texts_n,
	texts_s,
} from "@/services/localization/texts";
import { BntStack } from "@/shared/stack/stack";

type EmployeePreviewPureProps = {
	employee?: TProfile;
	onImageClick: VoidFunction;
	onTransferClick?: VoidFunction;
	onAdminDepositClick?: VoidFunction;
	onDisableClick?: VoidFunction;
	onActivateClick?: VoidFunction;
	allowDisable?: boolean;
	allowActivate?: boolean;
	allowAdminDeposit?: boolean;
};
export const EmployeePreviewPure: FC<EmployeePreviewPureProps> = ({
	employee,
	onImageClick = emptyFunction,
	onAdminDepositClick = emptyFunction,
	onTransferClick = emptyFunction,
	onActivateClick = emptyFunction,
	onDisableClick = emptyFunction,
	allowAdminDeposit,
	allowActivate,
	allowDisable,
}) => {
	const theme = useTheme();
	const { translate } = useBntTranslate();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<BntStack direction="column" className="height-100">
			<BntStack direction="column">
				<EmployeePreviewBreadcrumbs employee={employee} />
				<BntCard className="width-100 mb-1">
					<EmployeeActions
						allowDisable={allowDisable}
						allowActivate={allowActivate}
						allowAdminDeposit={allowAdminDeposit}
						onAdminDepositClick={onAdminDepositClick}
						onTransferClick={onTransferClick}
						onDisableClick={onDisableClick}
						onActivateClick={onActivateClick}
					/>
				</BntCard>
			</BntStack>

			<BntCard className="flex-grow scroll">
				<BntCardBody className="m-2 p-2">
					<Grid container justifyItems="flex-start" spacing={4}>
						<Grid
							item
							xs={12}
							sm={8}
							md={4}
							lg={4}
							xl={3}
							className={classNames("", { "text-align-center": matchesDownSm })}
						>
							<ImagePreview
								defaultImage={DEFAULT_AVATAR}
								image={employee?.user_avatar?.url}
								className="ml-3"
								onClick={onImageClick}
							/>
							<Stack
								direction={{ sm: "column", md: "row", xs: "row" }}
								justifyContent="center"
								alignItems={{ sm: "center", xs: "center" }}
								spacing={2}
								className="ml-4 mt-4"
							>
								{employee?.circles?.map((circle) => {
									return <BntChip color="info" label={circle.name} />;
								})}
							</Stack>
						</Grid>
						<Grid item xs={12} sm={12} md={5} lg={6} order={{ xs: 3, md: 2 }}>
							<Stack
								direction={{ sm: "row", xs: "column" }}
								alignItems={{ sm: "center", xs: "flex-start" }}
								spacing={2}
							>
								<BntTypography variant="h4" display="block">
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
							<BntTypography variant="h5" display="block" className="mb-4">
								{employee?.position}
							</BntTypography>
							<BntLabel name="email" value={employee?.email} className="mb-3" />
							<BntLabel name={texts_c.contact} value={employee?.contact} className="mb-3" />
							<BntLabel
								name={texts_b.birthday}
								value={formatStringDate(employee?.birthdate, true)}
								className="mb-3"
							/>
							<BntLabel
								name={texts_i.in_date}
								value={formatStringDate(employee?.in_date)}
								className="mb-3"
							/>
							<BntDivider className="mt-4 mb-4" />
							<Box>
								<BntTypography isPreformatted>{employee?.bio}</BntTypography>
							</Box>
						</Grid>
					</Grid>
				</BntCardBody>
			</BntCard>
		</BntStack>
	);
};
