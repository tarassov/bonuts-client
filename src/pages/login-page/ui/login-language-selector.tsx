import { LanguageOutlined } from "@mui/icons-material";
import { FormControl, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

import i18n from "i18next";

import { LOCALES } from "@/shared/config/locale";
import { useStorage } from "@/shared/lib/localStorage";
import { getBrowserLocale, normalizeLocale } from "@/shared/ui/locale";

import styles from "../login-page.module.scss";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_l } from "@/services/localization/texts";

const localeOptions = [
	{ value: LOCALES.ru, label: "RU", fullLabel: "Русский" },
	{ value: LOCALES.en, label: "EN", fullLabel: "English" },
	{ value: LOCALES.kk, label: "KZ", fullLabel: "Қазақша" },
];

type TLoginLocaleStorage = { locale: LOCALES };

export function LoginLanguageSelector() {
	const { translate } = useBntTranslate();
	const [storedLocale, setStoredLocale] = useStorage<TLoginLocaleStorage, "locale">("locale", getBrowserLocale());
	const locale = normalizeLocale(storedLocale);

	const handleLocaleChange = (event: SelectChangeEvent) => {
		const nextLocale = normalizeLocale(event.target.value);

		setStoredLocale(nextLocale);
		i18n.changeLanguage(nextLocale);
	};

	return (
		<FormControl className={styles.languageSelector} size="small">
			<Select
				aria-label={translate(texts_l.language)}
				data-testid="login-language-selector"
				value={locale}
				onChange={handleLocaleChange}
				startAdornment={<LanguageOutlined className={styles.languageIcon} fontSize="small" />}
			>
				{localeOptions.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.fullLabel}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
