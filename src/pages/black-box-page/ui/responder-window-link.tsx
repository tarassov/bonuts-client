import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";

import { BntButton } from "@/shared/ui/buttons";

import { blackBoxTexts } from "@/entities/black-box";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { routesPath } from "@/routes/config/routes-path";

export const ResponderWindowLink: FC = () => {
	const { t } = useBntTranslate();
	const navigate = useNavigate();

	return (
		<BntButton onClick={() => navigate(routesPath.BlackBoxAnswers)} variant="text" noTransform startIcon={<AdminPanelSettingsOutlined />}>
			{t(blackBoxTexts.responder_window)}
		</BntButton>
	);
};
