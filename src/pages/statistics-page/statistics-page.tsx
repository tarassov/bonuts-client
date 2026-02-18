import React, { FC } from "react";

import { CardWrapper } from "shared/ui/card-wrapper/card-wrapper";
import { BntStack } from "shared/ui/stack";

import { ReportsMain } from "@/features/reports";

export const StatisticsPage: FC = () => {
	return (
		<BntStack direction="column" className="height-100">
			<CardWrapper className="flex-grow scroll">
				<ReportsMain />
			</CardWrapper>
		</BntStack>
	);
};
