import React, { FC } from "react";
import { BntStack } from "shared/ui/stack/stack";
import { CardWrapper } from "shared/ui/card-wrapper/card-wrapper";
import { ReportsMain } from "@/features/reports/component/reports/reports-main";

export const StatisticsPage: FC = () => {
	return (
		<BntStack direction="column" className="height-100">
			<CardWrapper className="flex-grow scroll">
				<ReportsMain />
			</CardWrapper>
		</BntStack>
	);
};
