import { Grid2 as Grid } from "@mui/material";

import { BntCard } from "@/shared/ui/card/card";

import { useProfile } from "@/entities/profile";

import { ProfileLocaleSettings } from "@/widgets/integration-settings";

import { BntProfileForm } from "./profile-form";
import { ProfileHeader } from "./profile-header";

export function ProfileEdit() {
	const { profile, isLoading, error, updateProfile } = useProfile();
	return (
		<Grid container spacing={3} className="p-2">
			<Grid size={{ xs: 12 }}>
				<ProfileHeader profile={profile} />
			</Grid>
			<Grid container spacing={3} size={{ xs: 12 }} sx={{ flexDirection: { xs: "column-reverse", lg: "row" } }}>
				<Grid size={{ xs: 12, lg: 8 }}>
					<BntProfileForm profile={profile} isLoading={isLoading} error={error} updateProfile={updateProfile} />
				</Grid>
				<Grid size={{ xs: 12, lg: 4 }}>
					<BntCard data-testid="profile-locale-card" sx={{ p: 3 }}>
						<ProfileLocaleSettings />
					</BntCard>
				</Grid>
			</Grid>
		</Grid>
	);
}
