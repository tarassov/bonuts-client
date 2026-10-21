import type { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";

import { BntButton } from "@/shared/ui/buttons";
import { BntTypography } from "@/shared/ui/typography";

import { blackBoxTexts, type TBlackBoxProfile } from "@/entities/black-box";

import { useEmployeeOptions } from "../model/use-employee-options";
import { useRespondersPicker } from "../model/use-responders-picker";

import { ResponderOptionRow } from "./responder-option-row";
import { PickerCard, PickerFooter } from "./responders-picker.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

const isSameProfile = (option: TBlackBoxProfile, value: TBlackBoxProfile): boolean => option.id === value.id;
// the server already filtered the employees by the typed name
const keepServerOrder = (options: Array<TBlackBoxProfile>): Array<TBlackBoxProfile> => options;

export const RespondersPicker: FC = () => {
	const { t } = useBntTranslate();
	const { selected, setSelected, save, isLoading, isSaving, isChanged } = useRespondersPicker();
	const { options, searchText, setSearchText, isSearching } = useEmployeeOptions();

	return (
		<PickerCard elevation={0} variant="outlined">
			<Autocomplete
				multiple
				options={options}
				value={selected}
				loading={isLoading || isSearching}
				inputValue={searchText}
				onInputChange={(_event, value) => setSearchText(value)}
				onChange={(_event, value) => setSelected(value)}
				getOptionLabel={(option) => option.full_name}
				isOptionEqualToValue={isSameProfile}
				filterOptions={keepServerOrder}
				filterSelectedOptions
				renderOption={(props, option) => <ResponderOptionRow {...props} key={option.id} profile={option} />}
				renderInput={(params) => <TextField {...params} label={t(blackBoxTexts.settings_responders_label)} placeholder={t(blackBoxTexts.settings_search_employee)} />}
			/>
			<PickerFooter>
				<BntTypography variant="body2" color="text.secondary">
					{selected.length ? null : t(blackBoxTexts.settings_no_responders)}
				</BntTypography>
				<BntButton variant="contained" noTransform disabled={!isChanged || isSaving} onClick={save}>
					{t(blackBoxTexts.save)}
				</BntButton>
			</PickerFooter>
		</PickerCard>
	);
};
