import { CheckOutlined, DarkModeOutlined, LightModeOutlined, SettingsBrightnessOutlined } from "@mui/icons-material";
import { Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_t } from "@/services/localization/texts";
import { EThemeName } from "@/types/theme";

interface IThemeMenuProps {
	themeName: EThemeName;
	onThemeSelect: (themeName: EThemeName) => void;
}

export function ThemeMenu({ themeName, onThemeSelect }: IThemeMenuProps) {
	const { t } = useBntTranslate();

	return (
		<>
			<Divider />
			<MenuItem disabled>
				<ListItemText>{t(texts_t.theme)}</ListItemText>
			</MenuItem>
			<MenuItem onClick={() => onThemeSelect(EThemeName.System)} selected={themeName === EThemeName.System}>
				<ListItemIcon>
					<SettingsBrightnessOutlined fontSize="small" />
				</ListItemIcon>
				<ListItemText>{t(texts_t.theme_system)}</ListItemText>
				{themeName === EThemeName.System ? <CheckOutlined fontSize="small" /> : null}
			</MenuItem>
			<MenuItem onClick={() => onThemeSelect(EThemeName.Light)} selected={themeName === EThemeName.Light}>
				<ListItemIcon>
					<LightModeOutlined fontSize="small" />
				</ListItemIcon>
				<ListItemText>{t(texts_t.theme_light)}</ListItemText>
				{themeName === EThemeName.Light ? <CheckOutlined fontSize="small" /> : null}
			</MenuItem>
			<MenuItem onClick={() => onThemeSelect(EThemeName.Dark)} selected={themeName === EThemeName.Dark}>
				<ListItemIcon>
					<DarkModeOutlined fontSize="small" />
				</ListItemIcon>
				<ListItemText>{t(texts_t.theme_dark)}</ListItemText>
				{themeName === EThemeName.Dark ? <CheckOutlined fontSize="small" /> : null}
			</MenuItem>
		</>
	);
}
