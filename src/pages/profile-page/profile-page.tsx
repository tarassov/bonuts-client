import React from "react";
import { Grid } from "@mui/material";
import { BntProfileForm } from "components/profile/profile-form";
import { BntProfileImage } from "components/profile/profile-image";
import { CardWrapper } from "shared/card-wrapper/card-wrapper";
import { BntStack } from "shared/stack/stack";

export const ProfilePage: React.FC = () => {
	return (
		<BntStack direction="column" className="height-100">
			<CardWrapper className="flex-grow scroll">
				<Grid container spacing={2} className="p-2">
					<Grid item xs={12} sm={6} lg={4}>
						<BntProfileImage />
					</Grid>
					<Grid item xs={12} sm={6} lg={6}>
						<BntProfileForm />
					</Grid>
				</Grid>
			</CardWrapper>
		</BntStack>
	);
};
