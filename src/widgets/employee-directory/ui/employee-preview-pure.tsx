import type { FC } from "react";
import { useState } from "react";
import { Stack } from "@mui/material";

import { formatStringDate } from "@/shared/lib/date";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { CircleChip } from "@/entities/circle";
import { ProfilePhotos, ProfileStatusChips } from "@/entities/profile";

import { useBecome } from "@/features/auth/become";
import { EmployeeActions } from "@/features/employee/actions";
import { EmployeeEdit } from "@/features/employee/edit";

import { getEmployeePreviewInitials } from "../model/employee-directory-helper";

import { EmployeeLabel } from "./employee-label";
import { EmployeePreviewBreadcrumbs } from "./employee-preview-breadcrumbs";
import {
	EmployeePreviewActionsCard,
	EmployeePreviewAvatar,
	EmployeePreviewAvatarButton,
	EmployeePreviewBio,
	EmployeePreviewContentBody,
	EmployeePreviewContentCard,
	EmployeePreviewDetails,
	EmployeePreviewGallery,
	EmployeePreviewIdentity,
	EmployeePreviewLayout,
	EmployeePreviewPortrait,
	EmployeePreviewRoot,
} from "./employee-preview-styled";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_b, texts_c, texts_i, texts_n } from "@/services/localization/texts";
import type { TProfile } from "@/types/model";
import { emptyFunction } from "@/utils/empty-function";

type TEmployeePreviewViewProps = {
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

export const EmployeePreviewView: FC<TEmployeePreviewViewProps> = ({
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
	const { translate } = useBntTranslate();
	const { canBecome, isLoading: isBecoming, become } = useBecome(employee?.user_id);
	const [isEditMode, setIsEditMode] = useState(false);
	const isBioEmpty = !employee?.bio?.trim();
	const bio = isBioEmpty ? translate(texts_n.nothing_to_tell_here_yet) : employee?.bio;

	const name = employee?.user_name || employee?.name || "";
	const avatarUrl = employee?.user_avatar?.url;
	const initials = getEmployeePreviewInitials(name);
	const avatar = (
		<EmployeePreviewAvatar src={avatarUrl || undefined} alt="" aria-hidden>
			{initials || undefined}
		</EmployeePreviewAvatar>
	);

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
						onBecomeClick={canBecome ? become : undefined}
						isBecoming={isBecoming}
					/>
				</EmployeePreviewActionsCard>
			</BntStack>

			<EmployeePreviewContentCard className="scroll">
				<EmployeePreviewContentBody>
					{isEditMode ? (
						<EmployeeEdit profile={employee} onClose={() => setIsEditMode(false)} />
					) : (
						<EmployeePreviewLayout>
							<EmployeePreviewPortrait>
								{avatarUrl ? (
									<EmployeePreviewAvatarButton aria-label={name} onClick={onImageClick}>
										{avatar}
									</EmployeePreviewAvatarButton>
								) : (
									avatar
								)}
							</EmployeePreviewPortrait>
							<EmployeePreviewIdentity>
								<BntTypography variant="h4" variantMapping={{ h4: "h1" }}>
									{name}
								</BntTypography>
								<BntTypography variant="body1" color="text.secondary">
									{employee?.position}
								</BntTypography>
								{employee?.circles?.length ? (
									<Stack direction="row" flexWrap="wrap" gap={0.5}>
										{employee.circles.map((circle) => (
											<CircleChip key={circle.id} label={circle.name || ""} />
										))}
									</Stack>
								) : null}
							</EmployeePreviewIdentity>
							<EmployeePreviewDetails>
								<Stack direction="row" gap={0.5} flexWrap="wrap">
									<ProfileStatusChips profile={employee} subdued />
								</Stack>
								<EmployeeLabel name="email" value={employee?.email} />
								<EmployeeLabel name={texts_c.contact} value={employee?.contact || undefined} />
								<EmployeeLabel name={texts_b.birthday} value={formatStringDate(employee?.birthdate, true)} />
								<EmployeeLabel name={texts_i.in_date} value={formatStringDate(employee?.in_date)} />
								<EmployeePreviewBio isPlaceholder={isBioEmpty}>
									<BntTypography isPreformatted>{bio}</BntTypography>
								</EmployeePreviewBio>
							</EmployeePreviewDetails>
							<EmployeePreviewGallery>
								<ProfilePhotos profile={employee} />
							</EmployeePreviewGallery>
						</EmployeePreviewLayout>
					)}
				</EmployeePreviewContentBody>
			</EmployeePreviewContentCard>
		</EmployeePreviewRoot>
	);
};
