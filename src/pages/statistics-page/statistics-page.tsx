import React, { FC } from "react";
import { ReportsMain } from "components/reports/reports-main";
import { BntStack } from "shared/stack/stack";
import { CardWrapper } from "shared/card-wrapper/card-wrapper";

export const StatisticsPage: FC = () => {
	return (
		<BntStack direction="column" className="height-100">
			<CardWrapper className="flex-grow scroll">
				<ReportsMain />
			</CardWrapper>
		</BntStack>
	);
};
