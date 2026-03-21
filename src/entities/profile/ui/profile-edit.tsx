import { Grid2 as Grid } from "@mui/material";

import { BntCard } from "@/shared/ui/card/card";

import { useProfile } from "@/entities/profile";

import { ProfileLocaleSettings } from "@/widgets/integration-settings/ui/profile-locale-settings";

import { BntProfileForm } from "./profile-form";
import { BntProfileImage } from "./profile-image";

export function ProfileEdit() {
	const { profile, isLoading, error, updateProfile } = useProfile();
	return (
		<Grid container spacing={2} className="p-2">
			<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
				<BntProfileImage profile={profile} />
			</Grid>
			<Grid size={{ xs: 12, sm: 6, lg: 8 }}>
				<BntProfileForm profile={profile} isLoading={isLoading} error={error} updateProfile={updateProfile} />
			</Grid>
			<Grid size={{ xs: 12, lg: 8 }} offset={{ lg: 4 }}>
				<BntCard sx={{ p: 3 }}>
					<ProfileLocaleSettings />
				</BntCard>
			</Grid>
		</Grid>
	);
}
