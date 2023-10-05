import { FC, JSX } from "react";
import { BntCard } from "shared/card/card";
import { BntProfileButton } from "components/buttons/profile-button";
import { BntTypography } from "shared/typography/typography";
import { Box } from "@mui/material";
import { SearchString } from "components/search-string/search-string";
import { emptyFunction } from "utils/empty-function";
import { useSearch } from "logic/hooks/use-search";
import { getEmployeeSearchButtons } from "components/employee/get-employee-search-buttons";
import { BntStack } from "shared/stack/stack";
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
}> = ({ title, onClick, profiles, subTitle, children, hideSearch }) => {
	const { filteredList, setSorter, setSearch } = useSearch<TProfile>(profiles, {
		searchField: "name",
	});

	const buttons: Array<TSorterButton<TProfile>> = getEmployeeSearchButtons();

	return (
		<BntCard className="width-100 height-100">
			<BntStack className="width-100 height-100">
				<Box className="mr-4 ml-4">
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
				</Box>
				<Box className="m-2 flex-grow">
					{filteredList.map((x) => {
						return <BntProfileButton key={x.id} profile={x} onClick={() => onClick(x)} />;
					})}
				</Box>
				{children}
			</BntStack>
		</BntCard>
	);
};