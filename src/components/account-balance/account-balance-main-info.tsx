import { FC } from "react";
import { BntStack } from "shared/stack/stack";
import { BntTypography } from "shared/typography/typography";
import { Button } from "@mui/material";
import { useLocalDate } from "shared/locale/hooks/use-local-date";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { CommonStrings } from "constants/dictionary";

export const AccountBalanceMainInfo: FC<{
	title: string;
	balance?: number;
	value: React.ReactNode;
	lastOperation?: { direction?: "+" | "-"; amount?: number; date?: string; date_utc?: string };
	onClick?: VoidFunction;
	name?: string;
}> = ({ title, value, lastOperation, name, balance, onClick }) => {
	const { formatDate } = useLocalDate();
	const { t } = useBntTranslate();
	return (
		<BntStack>
			<BntStack direction="row" gap={1}>
				<BntTypography display="block" color="grey.700">
					{title}:
				</BntTypography>
				<BntStack direction="row">
					<BntTypography display="block" color="grey.main" className="mr-1">
						{balance}
					</BntTypography>
					{value}
				</BntStack>
			</BntStack>
			<Button sx={{ width: "fit-content" }} onClick={onClick}>
				<BntTypography variant="caption" color="grey.700" textTransform="none">
					<BntStack direction="row">
						{lastOperation
							? `${lastOperation?.direction}${lastOperation?.amount} ${
									name ? t(name, { count: lastOperation.amount }) : CommonStrings.EMPTY_STRING
							  } ${formatDate(lastOperation?.date_utc)}`
							: "..."}
					</BntStack>
				</BntTypography>
			</Button>
		</BntStack>
	);
};
