import { FC, JSX } from "react";
import { BntCard } from "shared/ui/card/card";
import { BntProfileButton } from "components/buttons/profile-button";
import { BntTypography } from "shared/ui/typography/typography";
import { BntBox } from "shared/ui/box/bnt-box";
import { SearchString } from "components/search-string/search-string";
import { emptyFunction } from "utils/empty-function";
import { getEmployeeSearchButtons } from "components/employee/get-employee-search-buttons";
import { BntStack } from "shared/ui/stack/stack";
import { TProfile } from "@/types/model";
import { VoidResponseFunction } from "@/types/function-types";
import { TSorterButton } from "@/types/ui/sorter-button";

export const EmployeeListCompact: FC<{
	profiles: Array<TProfile>;
	onClick: VoidResponseFunction<TProfile>;
	title?: string;
	subTitle?: string;
	hideSearch?: boolean;
	children?: JSX.Element;
	setSorter?: (sorter: any) => void;
	setSearch?: (searchText: string) => void;
}> = ({
	title,
	onClick,
	profiles,
	setSorter,
	setSearch = emptyFunction,
	subTitle,
	children,
	hideSearch,
}) => {
	// const { filteredList, setSorter, setSearch } = useSearch<TProfile>(profiles, {
	// 	searchField: "name",
	// });

	const buttons: Array<TSorterButton<TProfile>> = getEmployeeSearchButtons();

	return (
		<BntCard className="width-100 height-100">
			<BntStack className="width-100 height-100">
				<BntBox className="mr-4 ml-4">
					<BntTypography variant="h6" className="mb-2">
						{title}
					</BntTypography>
					<BntTypography variant="body2" className="mb-2">
						{subTitle}
					</BntTypography>
					{!hideSearch && (
						<SearchString
							setSearch={setSearch}
							setFilter={emptyFunction}
							setSorter={setSorter}
							buttons={buttons}
						/>
					)}
				</BntBox>
				<BntBox className="m-2 flex-grow">
					{profiles.map((x) => {
						return <BntProfileButton key={x.id} profile={x} onClick={() => onClick(x)} />;
					})}
				</BntBox>
				{children}
			</BntStack>
		</BntCard>
	);
};
