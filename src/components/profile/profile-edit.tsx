import { Grid } from "@mui/material";
import { BntProfileImage } from "components/profile/profile-image";
import { BntProfileForm } from "components/profile/profile-form";
import React from "react";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";

export const ProfileEdit = () => {
	const { profile, isLoading, error, updateProfile } = useProfileLogic();
	return (
		<Grid container spacing={2} className="p-2">
			<Grid item xs={12} sm={6} lg={4}>
				<BntProfileImage profile={profile} />
			</Grid>
			<Grid item xs={12} sm={6} lg={6}>
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
