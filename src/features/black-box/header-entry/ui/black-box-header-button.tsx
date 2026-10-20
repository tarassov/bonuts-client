import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";

import { blackBoxTexts, useBlackBoxAccess } from "@/entities/black-box";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { routesPath } from "@/routes/config/routes-path";

/** The header entry of the black box for every employee; its dot is the bell for new answers. */
export const BlackBoxHeaderButton: FC = () => {
	const { t } = useBntTranslate();
	const navigate = useNavigate();
	const { isEnabled, hasResponders, hasUnread } = useBlackBoxAccess();

	if (!isEnabled || !hasResponders) return null;

	const label = t(hasUnread ? blackBoxTexts.new_answers : blackBoxTexts.open_black_box);

	return (
		<Tooltip title={label}>
			<IconButton color="inherit" aria-label={label} onClick={() => navigate(routesPath.BlackBox)}>
				<Badge color="primary" variant="dot" invisible={!hasUnread} overlap="circular">
					<LockOutlined />
				</Badge>
			</IconButton>
		</Tooltip>
	);
};
