import React, { FC } from "react";
import { useParams } from "react-router-dom";

import { CardWrapper } from "shared/ui/card-wrapper/card-wrapper";
import { BntStack } from "shared/ui/stack";

import { AccountHistory } from "components/account-history/account-history";

export const AccountOperationsPage: FC = () => {
	const { id } = useParams();
	const accountId = Number(id);
	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<CardWrapper className="flex-grow scroll">
				<AccountHistory accountId={accountId} />
			</CardWrapper>
		</BntStack>
	);
};
