import { ChangeEvent, FC } from "react";
import { TDonut } from "../../../types/model/donut";
import { BntFormTextField } from "../../../base/form/fields/bnt-form-text-field";
import { Dictionary } from "../../../constants/dictionary";
import { TFieldType } from "../../../base/form/types/bnt-form";
import { BntTextField } from "../../../base/input/text-field";

export const BntDonutsSearch: FC<{
	setSearch: (search: string) => void;
	setFilter: (filters: Array<{ (a: TDonut): boolean }>) => void;
}> = ({ setFilter, setSearch }) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value || "");
	};
	return (
		<BntTextField
			name={"filter-donuts"}
			placeholder={Dictionary.SEARCH_STRING}
			type={TFieldType.text}
			onChange={handleChange}
			value={""}
			className={"mb-20"}
			sx={{ width: "100%" }}
		/>
	);
};
