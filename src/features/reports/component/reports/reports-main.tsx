import { BntTabs } from "shared/ui/tab/bnt-tabs";
import { BntTab } from "shared/ui/tab/bnt-tab";
import { SyntheticEvent, useState } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTabPanel } from "shared/ui/tab/bnt-tab-panel";
import { TieGraph } from "components/tie-graph/tie-graph";
import { BntStack } from "shared/ui/stack/stack";
import { CardWrapper } from "shared/ui/card-wrapper/card-wrapper";
import { BetaNotice } from "components/beta-notice/beta-notice";
import reportsTexts from "@/features/reports/localization/reports-texts";
import { StatisticsDashboard } from "@/features/reports/component/statistic/statistics-dashboard";

export const ReportsMain = () => {
	const [value, setValue] = useState(0);
	const { translate } = useBntTranslate();
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	return (
		<BntStack direction="column" className="height-100">
			<BntTabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				variant="fullWidth"
				aria-label="donuts tabs"
			>
				<BntTab label={translate(reportsTexts.dashboard)} tabValue={0} />
				<BntTab
					label={
						<span className="d-flex justify-content-center align-items-center width-100">
							<div className="d-flex flex-grow justify-content-center align-items-center">
								{translate(reportsTexts.network_connections)}
								<BetaNotice className="ml-2" />
							</div>
						</span>
					}
					tabValue={0}
				/>
			</BntTabs>
			<CardWrapper className="flex-grow scroll">
				<BntTabPanel value={value} index={0} className="height-100" boxClassName="height-100">
					<StatisticsDashboard />
				</BntTabPanel>
				<BntTabPanel value={value} index={1} className="height-100" boxClassName="height-100">
					<TieGraph />
				</BntTabPanel>
			</CardWrapper>
		</BntStack>
	);
};
