import React from "react";
import { CardWrapper } from "shared/card-wrapper/card-wrapper";
import { BntStack } from "shared/stack/stack";
import { ProfileEdit } from "components/profile/profile-edit";
import { Messenger } from "components/3cx/messenger";

export const ProfilePage: React.FC = () => {
	return (
		<>
			<BntStack direction="column" className="height-100">
				<CardWrapper className="flex-grow scroll">
					<ProfileEdit />
				</CardWrapper>
			</BntStack>
			<Messenger />
		</>
	);
};
