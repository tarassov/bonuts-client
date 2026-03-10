import { Divider } from "@mui/material";

import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography";

import { ProfileIntegrations } from "./profile-integrations";
import { ProfileLocaleSettings } from "./profile-locale-settings";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

export function ProfileSettings() {
	const { translate } = useBntTranslate();

	return (
		<BntStack direction="column" spacing={3} className="p-4">
			<BntStack direction="column" spacing={2}>
				<BntTypography variant="h6">{translate("integrations")}</BntTypography>
				<ProfileIntegrations />
			</BntStack>
			<Divider />
			<ProfileLocaleSettings />
		</BntStack>
	);
}
