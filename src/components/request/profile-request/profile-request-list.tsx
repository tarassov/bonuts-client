import { SyntheticEvent, useState } from "react";
import { BntTabs } from "shared/ui/tab/bnt-tabs";
import { BntTab } from "shared/ui/tab/bnt-tab";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTabPanel } from "shared/ui/tab/bnt-tab-panel";
import { CardWrapper } from "shared/ui/card-wrapper/card-wrapper";
import { BntStack } from "shared/ui/stack/stack";
import { ProfileActiveRequestList } from "components/request/profile-request/profile-active-request-list";
import { ProfileClosedRequestList } from "components/request/profile-request/profile-closed-request-list";
import { texts_a, texts_c } from "services/localization/texts";

export const ProfileRequestList = () => {
	const { translate } = useBntTranslate();
	const [value, setValue] = useState(0);

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
				aria-label="requests tabs"
			>
				<BntTab label={translate(texts_a.active_request)} tabValue={0} />
				<BntTab label={translate(texts_c.closed_requests)} tabValue={1} />
			</BntTabs>
			<CardWrapper className="flex-grow scroll">
				<BntTabPanel value={value} index={0}>
					<ProfileActiveRequestList />
				</BntTabPanel>
				<BntTabPanel value={value} index={1}>
					<ProfileClosedRequestList />
				</BntTabPanel>
			</CardWrapper>
		</BntStack>
	);
};
