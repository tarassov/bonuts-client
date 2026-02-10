import React, { SyntheticEvent, useState } from "react";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useSearchQuery } from "hooks/use-search-query";
import { texts_i, texts_p } from "services/localization/texts";
import { CardWrapper } from "shared/ui/card-wrapper/card-wrapper";
import { BntStack } from "shared/ui/stack";
import { BntTab } from "shared/ui/tab/bnt-tab";
import { BntTabPanel } from "shared/ui/tab/bnt-tab-panel";
import { BntTabs } from "shared/ui/tab/bnt-tabs";

import { ProfileEdit } from "@/entities/profile";

import { Messenger } from "@/features/3cx/messenger";

import { ProfileIntegrations } from "src/widgets/integration-settings";

export function ProfilePage() {
	const query = useSearchQuery();
	const { translate } = useBntTranslate();
	const [value, setValue] = useState(query.get("tab") === "integrations" ? 1 : 0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<>
			<BntStack direction="column" className="height-100">
				<BntTabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="profile tabs"
				>
					<BntTab label={translate(texts_p.profile)} tabValue={0} />
					<BntTab label={translate(texts_i.integrations)} tabValue={1} />
				</BntTabs>
				<CardWrapper className="flex-grow scroll">
					<BntTabPanel value={value} index={0}>
						<ProfileEdit />
					</BntTabPanel>
					<BntTabPanel value={value} index={1}>
						<ProfileIntegrations />
					</BntTabPanel>
				</CardWrapper>
			</BntStack>
			<Messenger />
		</>
	);
}
