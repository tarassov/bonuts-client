import { CloseOutlined } from "@mui/icons-material";
import { Grid2 as Grid } from "@mui/material";

import { BntIconButton } from "@/shared/ui/icon-button";
import { BntStack } from "@/shared/ui/stack";

import { BntProfileForm, ProfileHeader, useUpdateProfile } from "@/entities/profile";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c } from "@/services/localization/texts";
import type { TProfile } from "@/types/model";
import { emptyFunction } from "@/utils/empty-function";

type TEmployeeEditProps = {
	profile?: TProfile;
	onClose?: VoidFunction;
};

export function EmployeeEdit({ profile, onClose = emptyFunction }: TEmployeeEditProps) {
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
				<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
					<ProfileHeader profile={profile} />
				</Grid>
				<Grid size={{ xs: 12, sm: 6, lg: 6 }}>
					<BntProfileForm profile={profile} updateProfile={updateProfile} />
				</Grid>
			</Grid>
		</>
	);
}
