import { ChangeEvent, FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTextInput } from "shared/input/text-input";
import { CommonStrings } from "constants/dictionary";

export const DefaultColumnFilter: FC<{
	column: {
		filterValue: string;
		preFilteredRows: Array<any>;
		setFilter: (filter: string | undefined) => void;
	};
}> = ({ column }) => {
	const { filterValue, preFilteredRows, setFilter } = column;
	const count = preFilteredRows.length;
	const { translate } = useBntTranslate();
	const onChange = (e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value || undefined);
	return (
		<BntTextInput
			name={CommonStrings.EMPTY_STRING}
			onChange={onChange}
			value={filterValue}
			placeholder={`${translate("Search")} (${count} ${translate("records")}...)`}
		/>
	);
};
