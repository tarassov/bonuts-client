import { useMemo } from "react";
import { LanguageOutlined } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { useLocale } from "@/shared/ui/locale/hooks/use-locale";
import { LOCALES } from "@/shared/ui/locale/locale-context";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

export function ProfileLocaleSettings() {
	const { translate } = useBntTranslate();
	const { locale, setLocale } = useLocale();

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
	};

	return (
		<BntStack direction="column" spacing={2}>
			<BntStack direction="row" sx={{ gap: 2, alignItems: "center", mb: 2 }}>
				<LanguageOutlined color="primary" sx={{ fontSize: 32 }} />
				<BntTypography variant="h6">{translate("locale", { capitalize: true })}</BntTypography>
			</BntStack>
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
