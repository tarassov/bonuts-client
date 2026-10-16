import type { FC } from "react";
import { Stack } from "@mui/material";

import classNames from "classnames";

import { BntTypography } from "@/shared/ui/typography";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TEmployeeLabelProps = {
	name: string;
	value?: string;
	className?: string;
};

export const EmployeeLabel: FC<TEmployeeLabelProps> = ({ name, value, className }) => {
	const { translate } = useBntTranslate();

	return (
		<Stack direction="row" alignItems="baseline" className={classNames(className, "mt-2")}>
			<BntTypography display="block" color="neutral.main">
				{translate(name).toLowerCase()}:
			</BntTypography>
			<BntTypography display="block" className="ml-4">
				{value}
			</BntTypography>
		</Stack>
	);
};
