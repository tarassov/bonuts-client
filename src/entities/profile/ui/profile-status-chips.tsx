import { ErrorOutline, ShieldOutlined, StorefrontOutlined } from "@mui/icons-material";
import { SxProps, Theme } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { BntChip } from "@/shared/ui/chip/chip";

import { texts_a, texts_n, texts_s } from "@/services/localization/texts";
import { TProfile } from "@/types/model";

export function ProfileStatusChips({ profile, adminSx }: { profile?: TProfile; adminSx?: SxProps<Theme> }) {
	const { translate } = useBntTranslate();

	if (!profile?.admin && profile?.active !== false && !profile?.store_admin) {
		return null;
	}

	return (
		<>
			{profile?.admin ? <BntChip color="primary" icon={<ShieldOutlined />} label={translate(texts_a.admin)} sx={adminSx} /> : null}
			{profile?.active === false ? <BntChip color="error" icon={<ErrorOutline />} label={translate(texts_n.not_active)} /> : null}
			{profile?.store_admin ? <BntChip color="warning" icon={<StorefrontOutlined />} label={translate(texts_s.store_admin)} /> : null}
		</>
	);
}
