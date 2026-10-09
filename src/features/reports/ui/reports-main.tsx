import { SyntheticEvent, useState } from "react";

import { TieGraph } from "components/tie-graph/tie-graph";
import { useBntTranslate } from "hooks/use-bnt-translate";

import { isAdmin } from "@/shared/lib/user";
import { useCurrentProfile } from "@/shared/model/auth";
import { BetaNotice } from "@/shared/ui/beta-notice";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { BntStack } from "@/shared/ui/stack";
import { BntTab, BntTabPanel, BntTabs } from "@/shared/ui/tab";

import { HrSummaryChat, hrSummaryTexts } from "@/features/hr-summary";

import reportsTexts from "../config/reports-texts";

import { StatisticsDashboard } from "./statistics-dashboard";

enum ReportsTab {
	Dashboard = 0,
	NetworkConnections = 1,
	AiSummary = 2,
}

export function ReportsMain() {
	const [value, setValue] = useState<ReportsTab>(ReportsTab.Dashboard);
	const { translate } = useBntTranslate();
	const { profile } = useCurrentProfile();
	const canSeeAiSummary = isAdmin(profile);

	const handleChange = (event: SyntheticEvent, newValue: ReportsTab) => {
		setValue(newValue);
	};

	return (
		<BntStack direction="column" className="height-100">
			<BntTabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth" aria-label="donuts tabs">
				<BntTab label={translate(reportsTexts.dashboard)} tabValue={ReportsTab.Dashboard} />
				<BntTab
					label={
						<span className="d-flex justify-content-center align-items-center width-100">
							<div className="d-flex flex-grow justify-content-center align-items-center">
								{translate(reportsTexts.network_connections)}
								<BetaNotice className="ml-2" />
							</div>
						</span>
					}
					tabValue={ReportsTab.NetworkConnections}
				/>
				{canSeeAiSummary ? <BntTab label={translate(hrSummaryTexts.ai_summary)} tabValue={ReportsTab.AiSummary} /> : null}
			</BntTabs>
			<CardWrapper className="flex-grow scroll">
				<BntTabPanel value={value} index={ReportsTab.Dashboard} className="height-100" boxClassName="height-100">
					<StatisticsDashboard />
				</BntTabPanel>
				<BntTabPanel value={value} index={ReportsTab.NetworkConnections} className="height-100" boxClassName="height-100">
					<TieGraph />
				</BntTabPanel>
				{canSeeAiSummary ? (
					<BntTabPanel value={value} index={ReportsTab.AiSummary} className="height-100" boxClassName="height-100">
						<HrSummaryChat />
					</BntTabPanel>
				) : null}
			</CardWrapper>
		</BntStack>
	);
}
