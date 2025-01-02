import React from "react";
import { BntStack } from "shared/ui/stack/stack";
import { CardWrapper } from "shared/ui/card-wrapper/card-wrapper";
import { CreateInvitationForm } from "components/invitation/create-invitation-form";

export const InvitationPage: React.FC = () => {
	return (
		<BntStack direction="column" className="height-100">
			<CardWrapper className="flex-grow scroll">
				<CreateInvitationForm />
			</CardWrapper>
		</BntStack>
	);
};
