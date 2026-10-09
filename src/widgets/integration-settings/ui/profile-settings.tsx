import { useIcons } from "hooks/use-icons";
import { texts_i } from "services/localization/texts";

import { BntCard } from "@/shared/ui/card";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { ProfileIntegrations } from "./profile-integrations";
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
						<BntTypography variant="h5">{translate(texts_i.integration_channels)}</BntTypography>
					</BntStack>
					<ProfileIntegrations />
				</BntCard>
			</BntStack>
		</BntStack>
	);
}
