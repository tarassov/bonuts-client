import { useNavigate } from "react-router-dom";
import { Grid2 as Grid } from "@mui/material";

import { BntRoutes } from "@/shared/config/routes";
import { BntCard } from "@/shared/ui/card";

import { useProfile } from "@/entities/profile";

import { ProfileLocaleSettings } from "@/widgets/integration-settings";

import { BntProfileForm } from "./profile-form";
import { ProfileHeader } from "./profile-header";
import { routesPath } from "@/routes/config/routes-path";

export function ProfileEdit() {
	const navigate = useNavigate();
	const { profile, isLoading, error, updateProfile } = useProfile();
	const handleAddPhotoClick = () => {
		navigate(routesPath[BntRoutes.Photos]);
	};

	return (
		<Grid container spacing={3} className="p-2">
			<Grid size={{ xs: 12 }}>
				<ProfileHeader profile={profile} onPhotosClick={handleAddPhotoClick} />
			</Grid>
			<Grid container spacing={3} size={{ xs: 12 }} sx={{ flexDirection: { xs: "column-reverse", lg: "row" } }}>
				<Grid size={{ xs: 12, lg: 8 }}>
					<BntProfileForm profile={profile} isLoading={isLoading} error={error} updateProfile={updateProfile} isEmailEditable={false} />
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
