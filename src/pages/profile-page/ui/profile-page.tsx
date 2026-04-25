import React, { SyntheticEvent, useState } from "react";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useSearchQuery } from "hooks/use-search-query";
import { texts_p, texts_s } from "services/localization/texts";

import { CardWrapper } from "@/shared/ui/card-wrapper";
import { BntStack } from "@/shared/ui/stack";
import { BntTab, BntTabPanel, BntTabs } from "@/shared/ui/tab";

import { ProfileEdit } from "@/entities/profile";

import { Messenger } from "@/features/3cx";

import { ProfileSettings } from "src/widgets/integration-settings";

export function ProfilePage() {
	const query = useSearchQuery();
	const { translate } = useBntTranslate();
	const [value, setValue] = useState(query.get("tab") === "settings" || query.get("tab") === "integrations" ? 1 : 0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<>
			<BntStack direction="column" className="height-100">
				<BntTabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth" aria-label="profile tabs">
					<BntTab label={translate(texts_p.profile)} tabValue={0} />
					<BntTab label={translate(texts_s.settings)} tabValue={1} />
				</BntTabs>
				<CardWrapper className="flex-grow scroll">
					<BntTabPanel value={value} index={0}>
						<ProfileEdit />
					</BntTabPanel>
					<BntTabPanel value={value} index={1}>
						<ProfileSettings />
					</BntTabPanel>
				</CardWrapper>
			</BntStack>
			<Messenger />
		</>
	);
}
