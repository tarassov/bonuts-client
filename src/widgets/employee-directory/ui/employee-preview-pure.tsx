import type { FC } from "react";
import { useState } from "react";
import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";

import { BntDivider } from "@/shared/ui/divider/bnt-divider";
import { ImagePreview } from "@/shared/ui/image/image-preview";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography/typography";

import { ProfileStatusChips } from "@/entities/profile";

import { EmployeeActions } from "@/features/employee/actions";
import { EmployeeEdit } from "@/features/employee/edit";

import { EmployeeLabel } from "./employee-label";
import { EmployeePreviewBreadcrumbs } from "./employee-preview-breadcrumbs";
import {
	EmployeePreviewActionsCard,
	EmployeePreviewAvatarColumn,
	EmployeePreviewAvatarWrap,
	EmployeePreviewBio,
	EmployeePreviewCircles,
	EmployeePreviewContentBody,
	EmployeePreviewContentCard,
	EmployeePreviewIdentity,
	EmployeePreviewRoot,
} from "./employee-preview-styled";
import { CircleTag } from "@/components/circle/circle-tag/circle-tag";
import { DEFAULT_AVATAR } from "@/constants/images";
import { texts_b, texts_c, texts_i } from "@/services/localization/texts";
import type { TProfile } from "@/types/model";
import { emptyFunction } from "@/utils/empty-function";
import { formatStringDate } from "@/utils/format-string-date";

type TEmployeePreviewPureProps = {
	className?: string;
	employee?: TProfile;
	onImageClick: VoidFunction;
	onTransferClick?: VoidFunction;
	onAdminDepositClick?: VoidFunction;
	onDisableClick?: VoidFunction;
	onActivateClick?: VoidFunction;
	allowDisable?: boolean;
	allowActivate?: boolean;
	allowAdminDeposit?: boolean;
	allowEdit?: boolean;
};

export const EmployeePreviewPure: FC<TEmployeePreviewPureProps> = ({
	className,
	employee,
	onImageClick = emptyFunction,
	onAdminDepositClick = emptyFunction,
	onTransferClick = emptyFunction,
	onActivateClick = emptyFunction,
	onDisableClick = emptyFunction,
	allowAdminDeposit,
	allowActivate,
	allowDisable,
	allowEdit,
}) => {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [isEditMode, setIsEditMode] = useState(false);

	return (
		<EmployeePreviewRoot direction="column" className={className}>
			<BntStack direction="column">
				<EmployeePreviewBreadcrumbs employee={employee} />
				<EmployeePreviewActionsCard>
					<EmployeeActions
						allowDisable={allowDisable}
						allowActivate={allowActivate}
						allowAdminDeposit={allowAdminDeposit}
						allowEdit={allowEdit}
						onAdminDepositClick={onAdminDepositClick}
						onTransferClick={onTransferClick}
						onEditClick={() => setIsEditMode(true)}
						onDisableClick={onDisableClick}
						onActivateClick={onActivateClick}
					/>
				</EmployeePreviewActionsCard>
			</BntStack>

			<EmployeePreviewContentCard className="scroll">
				<EmployeePreviewContentBody>
					{isEditMode ? (
						<EmployeeEdit profile={employee} onClose={() => setIsEditMode(false)} />
					) : (
						<Grid container justifyItems="flex-start" spacing={4}>
							<EmployeePreviewAvatarColumn item xs={12} sm={8} md={4} lg={4} xl={3}>
								<EmployeePreviewAvatarWrap>
									<ImagePreview defaultImage={DEFAULT_AVATAR} image={employee?.user_avatar?.url} onClick={onImageClick} />
								</EmployeePreviewAvatarWrap>
								<EmployeePreviewCircles direction="row" justifyContent="center" alignItems={{ sm: "center", xs: "center" }} flexWrap="wrap" spacing={1} gap={1}>
									{employee?.circles?.map((circle) => {
										return <CircleTag key={circle.id} title={circle.name} />;
									})}
								</EmployeePreviewCircles>
							</EmployeePreviewAvatarColumn>
							<Grid item xs={12} sm={12} md={5} lg={6} order={{ xs: 3, md: 2 }}>
								<EmployeePreviewIdentity>
									<Stack direction={{ sm: "row", xs: "column" }} alignItems={{ sm: "center", xs: "flex-start" }} spacing={2}>
										<BntTypography variant="h4" display="block">
											{employee?.user_name}
										</BntTypography>
										<Stack direction={{ sm: "column", md: "row", xs: "column" }} spacing={2}>
											<ProfileStatusChips profile={employee} />
										</Stack>
									</Stack>
									<BntTypography variant="h5" display="block">
										{employee?.position}
									</BntTypography>
									<EmployeeLabel name="email" value={employee?.email} />
									<EmployeeLabel name={texts_c.contact} value={employee?.contact} />
									<EmployeeLabel name={texts_b.birthday} value={formatStringDate(employee?.birthdate, true)} />
									<EmployeeLabel name={texts_i.in_date} value={formatStringDate(employee?.in_date)} />
								</EmployeePreviewIdentity>
								<BntDivider sx={{ my: matchesDownSm ? 1.5 : 2 }} />
								<EmployeePreviewBio>
									<BntTypography isPreformatted>{employee?.bio}</BntTypography>
								</EmployeePreviewBio>
							</Grid>
						</Grid>
					)}
				</EmployeePreviewContentBody>
			</EmployeePreviewContentCard>
		</EmployeePreviewRoot>
	);
};
