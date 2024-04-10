import React, { SyntheticEvent, useState } from "react";
import { CardWrapper } from "shared/card-wrapper/card-wrapper";
import { BntStack } from "shared/stack/stack";
import { ProfileEdit } from "components/profile/profile-edit";
import { BntTabs } from "shared/tab/bnt-tabs";
import { BntTab } from "shared/tab/bnt-tab";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_i, texts_p } from "services/localization/texts";
import { BntTabPanel } from "shared/tab/bnt-tab-panel";
import { useQuery } from "hooks/use-query";
import { Messenger } from "@/features/3cx/messenger";
import { ProfileIntegrations } from "@/features/integration-settings/profile-integrations";

export const ProfilePage: React.FC = () => {
	const query = useQuery();
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
};
