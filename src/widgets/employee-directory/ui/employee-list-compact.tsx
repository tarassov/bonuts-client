import type { FC, JSX } from "react";

import { BntBox } from "@/shared/ui/box";
import { BntCard } from "@/shared/ui/card";
import { SearchString } from "@/shared/ui/search-string";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { getEmployeeSearchButtons } from "../model/get-employee-search-buttons";

import { BntProfileButton } from "@/components/buttons/profile-button";
import type { VoidResponseFunction } from "@/types/function-types";
import type { TProfile } from "@/types/model";
import type { TSorterButton } from "@/types/ui/sorter-button";
import { emptyFunction } from "@/utils/empty-function";

type TEmployeeListCompactProps = {
	profiles: Array<TProfile>;
	onClick: VoidResponseFunction<TProfile>;
	title?: string;
	subTitle?: string;
	hideSearch?: boolean;
	children?: JSX.Element;
	setSorter?: (sorter: any) => void;
	setSearch?: (searchText: string) => void;
};

export const EmployeeListCompact: FC<TEmployeeListCompactProps> = ({ title, onClick, profiles, setSorter, setSearch = emptyFunction, subTitle, children, hideSearch }) => {
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
					{!hideSearch && <SearchString setSearch={setSearch} setFilter={emptyFunction} setSorter={setSorter} buttons={buttons} />}
				</BntBox>
				<BntBox className="m-2 flex-grow">
					{profiles.map((profile) => {
						return <BntProfileButton key={profile.id} profile={profile} onClick={() => onClick(profile)} />;
					})}
				</BntBox>
				{children}
			</BntStack>
		</BntCard>
	);
};
