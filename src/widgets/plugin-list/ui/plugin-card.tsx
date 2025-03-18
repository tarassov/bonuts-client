import { FC } from "react";
import { CheckCircleOutlined } from "@mui/icons-material";

import { BntBox } from "shared/ui/box/bnt-box";
import { BntStack } from "shared/ui/stack/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { texts_n } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { TPlugin } from "@/types/model";
import { PluginCardContainer } from "@/widgets/plugin-list/ui/plugin-card-container";

export const PluginCard: FC<{
	preventEdit?: boolean;
	plugin: TPlugin;
	openEdit: VoidFunction;
}> = ({ plugin, preventEdit, openEdit }) => {
	const { t } = useBntTranslate();

	return (
		<PluginCardContainer
			raised
			onClick={() => {
				if (!preventEdit) openEdit();
			}}
		>
			<BntStack direction="row" gap={4} justifyContent="space-between" sx={{ width: "100%" }}>
				<BntBox sx={{ flexGrow: 1 }}>
					{plugin.name || t(texts_n.no_name, { capitalize: true })}
				</BntBox>

				{plugin.active ? <CheckCircleOutlined color="success" /> : null}

				<BntBox>
					<BntTypography variant="caption2" />
				</BntBox>
			</BntStack>
		</PluginCardContainer>
	);
};
