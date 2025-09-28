import { FC } from "react";
import { Button } from "@mui/material";

import { BntStack } from "shared/ui/stack/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { formatStringDate } from "utils/format-string-date";

import { CommonStrings } from "constants/dictionary";

import { useBntTranslate } from "hooks/use-bnt-translate";

export const AccountBalanceMainInfo: FC<{
	title: string;
	balance?: number;
	value: React.ReactNode;
	lastOperation?: { direction?: "+" | "-"; amount?: number; date?: string; date_utc?: string };
	onClick?: VoidFunction;
	name?: string;
}> = ({ title, value, lastOperation, name, balance, onClick }) => {
	const { t } = useBntTranslate();
	return (
		<BntStack>
			<BntStack direction="row" gap={1}>
				<BntTypography display="block" color="secondary.contrastText">
					{title}:
				</BntTypography>
				<BntStack direction="row">
					<BntTypography display="block" color="textPrimary" className="mr-1">
						{balance}
					</BntTypography>
					{value}
				</BntStack>
			</BntStack>
			<Button sx={{ width: "fit-content" }} onClick={onClick}>
				<BntTypography variant="caption" color="secondary.contrastText" textTransform="none">
					<BntStack direction="row">
						{lastOperation
							? `${lastOperation?.direction}${lastOperation?.amount} ${
									name ? t(name, { count: lastOperation.amount }) : CommonStrings.EMPTY_STRING
							  } ${formatStringDate(lastOperation?.date_utc, false, true)}`
							: "..."}
					</BntStack>
				</BntTypography>
			</Button>
		</BntStack>
	);
};
