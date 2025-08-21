import React from "react";
import { Grid2 as Grid } from "@mui/material";

import { BntProfileForm } from "./profile-form";
import { BntProfileImage } from "./profile-image";

import { useProfileLogic } from "@/entities/profile";

export const ProfileEdit = () => {
	const { profile, isLoading, error, updateProfile } = useProfileLogic();
	return (
		<Grid container spacing={2} className="p-2">
			<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
				<BntProfileImage profile={profile} />
			</Grid>
			<Grid size={{ xs: 12, sm: 6, lg: 6 }}>
				<BntProfileForm
					profile={profile}
					isLoading={isLoading}
					error={error}
					updateProfile={updateProfile}
				/>
			</Grid>
		</Grid>
	);
};
