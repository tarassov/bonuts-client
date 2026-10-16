import { CheckCircleOutlined } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_n } from "services/localization/texts";

import { BntBox } from "@/shared/ui/box";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { TPlugin } from "@/types/model";

export function PluginHeader({ plugin }: { plugin: TPlugin }) {
	const { t } = useBntTranslate();
	return (
		<BntStack direction="row" gap={4} justifyContent="space-between" sx={{ width: "100%" }}>
			<BntBox sx={{ flexGrow: 1 }}>{plugin.name || t(texts_n.no_name, { capitalize: true })}</BntBox>

			{plugin.active ? <CheckCircleOutlined color="success" /> : null}

			<BntBox>
				<BntTypography variant="caption2" />
			</BntBox>
		</BntStack>
	);
}
