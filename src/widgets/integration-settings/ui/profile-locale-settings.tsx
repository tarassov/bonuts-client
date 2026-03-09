import { useMemo } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import i18n from "i18next";

import { useStorage } from "shared/lib/localStorage";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

const LOCALE_STORAGE_KEY = "locale";

enum LOCALES {
	en = "en",
	kk = "kk",
	ru = "ru",
}

type TProfileStorageConfig = { locale: LOCALES };

const getDetectedLocale = () => {
	const detectedLocale = i18n.resolvedLanguage || i18n.language || navigator.language || LOCALES.en;
	const normalizedLocale = detectedLocale.toLowerCase();

	if (normalizedLocale.startsWith(LOCALES.kk)) return LOCALES.kk;
	if (normalizedLocale.startsWith(LOCALES.ru)) return LOCALES.ru;

	return LOCALES.en;
};

export function ProfileLocaleSettings() {
	const { translate } = useBntTranslate();
	const [locale, setLocale] = useStorage<TProfileStorageConfig, typeof LOCALE_STORAGE_KEY>(LOCALE_STORAGE_KEY, getDetectedLocale());

	const localeOptions = useMemo(
		() => [
			{ value: LOCALES.ru, label: "Русский" },
			{ value: LOCALES.en, label: "English" },
			{ value: LOCALES.kk, label: "Қазақша" },
		],
		[]
	);

	const handleLocaleChange = (event: SelectChangeEvent) => {
		const nextLocale = String(event.target.value) as LOCALES;
		setLocale(nextLocale);
		i18n.changeLanguage(nextLocale);
	};

	return (
		<BntStack direction="column" spacing={2}>
			<BntTypography variant="h6">{translate("locale")}</BntTypography>
			<FormControl variant="standard" sx={{ maxWidth: 280 }}>
				<InputLabel id="profile-locale-select-label">{translate("locale")}</InputLabel>
				<Select labelId="profile-locale-select-label" id="profile-locale-select" value={locale} onChange={handleLocaleChange}>
					{localeOptions.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</BntStack>
	);
}
