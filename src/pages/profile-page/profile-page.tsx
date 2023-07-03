import React from "react";
import { Grid } from "@mui/material";
import { BntProfileForm } from "components/profile/profile-form";
import { BntProfileImage } from "components/profile/profile-image";
import { ElementWrapper } from "components/element-wrapper/element-wrapper";

export const ProfilePage: React.FC = () => {
	return (
		<ElementWrapper>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} lg={4}>
					<BntProfileImage />
				</Grid>
				<Grid item xs={12} sm={6} lg={6}>
					<BntProfileForm />
				</Grid>
			</Grid>
		</ElementWrapper>
	);
};
