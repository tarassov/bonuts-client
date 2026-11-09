import { SwitchAccountOutlined } from "@mui/icons-material";

import { BntIconButton } from "@/shared/ui/icon-button";

import { useBecome } from "../model/use-become";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_b } from "@/services/localization/texts";

export function BecomeButton({ userId }: { userId?: number }) {
	const { canBecome, isLoading, become } = useBecome(userId);
	const { t } = useBntTranslate();

	if (!canBecome) return null;

	return (
		<BntIconButton sx={{ alignSelf: "flex-start" }} tooltip={texts_b.become_user} aria-label={t(texts_b.become_user)} disabled={isLoading} onClick={become}>
			<SwitchAccountOutlined />
		</BntIconButton>
	);
}
