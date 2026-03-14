import { Divider } from "@mui/material";

import { useIcons } from "hooks/use-icons";
import { BntCard } from "shared/ui/card/card";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography";

import { ProfileIntegrations } from "./profile-integrations";
import { ProfileLocaleSettings } from "./profile-locale-settings";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

export function ProfileSettings() {
	const { translate } = useBntTranslate();
	const { Integrations } = useIcons({ width: 32, height: 32, variant: "primary" });

	return (
		<BntStack direction="column" spacing={3} className="p-4">
			<BntStack direction="column" spacing={2}>
				<BntCard sx={{ p: 4 }}>
					<BntStack direction="row" sx={{ alignItems: "center", gap: 2, mb: 2 }}>
						<Integrations />
						<BntTypography variant="h5">{translate("integrations", { capitalize: true })}</BntTypography>
					</BntStack>
					<ProfileIntegrations />
				</BntCard>
			</BntStack>
			<Divider />
			<BntCard sx={{ p: 4 }}>
				<ProfileLocaleSettings />
			</BntCard>
		</BntStack>
	);
}
