import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";

import { BntButton } from "@/shared/ui/buttons";

import { blackBoxTexts } from "@/entities/black-box";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { routesPath } from "@/routes/config/routes-path";

export const BackToBlackBoxLink: FC = () => {
	const { t } = useBntTranslate();
	const navigate = useNavigate();

	return (
		<BntButton onClick={() => navigate(routesPath.BlackBox)} variant="text" noTransform startIcon={<ArrowBackOutlined />}>
			{t(blackBoxTexts.black_box)}
		</BntButton>
	);
};
