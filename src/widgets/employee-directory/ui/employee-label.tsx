import type { FC } from "react";
import { Stack } from "@mui/material";

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
		<Stack direction="row" alignItems="baseline" gap={1} flexWrap="wrap" className={className}>
			<BntTypography display="block" color="text.secondary">
				{translate(name).toLowerCase()}:
			</BntTypography>
			<BntTypography display="block" sx={{ overflowWrap: "anywhere", minWidth: 0 }}>
				{value}
			</BntTypography>
		</Stack>
	);
};
