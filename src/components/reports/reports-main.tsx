import { BntTabs } from "shared/tab/bnt-tabs";
import { BntTab } from "shared/tab/bnt-tab";
import { SyntheticEvent, useState } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTabPanel } from "shared/tab/bnt-tab-panel";
import { TieGraph } from "components/tie-graph/tie-graph";
import { texts_n } from "services/localization/texts";
import { BntStack } from "shared/stack/stack";
import { CardWrapper } from "@/shared/card-wrapper/card-wrapper";

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
				<BntTab label={translate(texts_n.network_connections)} tabValue={0} />
			</BntTabs>
			<CardWrapper className="flex-grow scroll">
				<BntTabPanel value={value} index={0} className="height-100" boxClassName="height-100">
					<TieGraph />
				</BntTabPanel>
			</CardWrapper>
		</BntStack>
	);
};