import React, { FC } from "react";
import { CloseOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";

import { BntIconButton } from "shared/ui/icon-button/bnt-icon-button";
import { BntStack } from "shared/ui/stack/stack";

import { emptyFunction } from "utils/empty-function";

import { texts_c } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { useUpdateProfile } from "logic/hooks/profile/use-update-profile";

import { BntProfileForm, BntProfileImage } from "@/entities/profile";
import { TProfile } from "@/types/model";

export const EmployeeEdit: FC<{ profile?: TProfile; onClose?: VoidFunction }> = ({
	profile,
	onClose = emptyFunction,
}) => {
	const { updateProfile } = useUpdateProfile();
	const { translate } = useBntTranslate();
	return (
		<>
			<BntStack direction="row" justifyContent="flex-end">
				<BntIconButton customIcon tooltip={`${translate(texts_c.close)}`} onClick={onClose}>
					<CloseOutlined />
				</BntIconButton>
			</BntStack>
			<Grid container spacing={2} className="p-2">
				<Grid item xs={12} sm={6} lg={4}>
					<BntProfileImage profile={profile} />
				</Grid>
				<Grid item xs={12} sm={6} lg={6}>
					<BntProfileForm profile={profile} updateProfile={updateProfile} />
				</Grid>
			</Grid>
		</>
	);
};
