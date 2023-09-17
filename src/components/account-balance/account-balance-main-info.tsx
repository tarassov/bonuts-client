import { FC } from "react";
import { BntStack } from "shared/stack/stack";
import { BntTypography } from "shared/typography/typography";
import { Button } from "@mui/material";
import { useLocalDate } from "shared/locale/hooks/use-local-date";

export const AccountBalanceMainInfo: FC<{
	title: string;
	balance?: number;
	value: React.ReactNode;
	lastOperation?: { direction?: "+" | "-"; amount?: number; date?: string; date_utc?: string };
	onClick?: VoidFunction;
}> = ({ title, value, lastOperation, balance, onClick }) => {
	const { formatDate } = useLocalDate();
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
				<BntTypography variant="caption" color="grey.700">
					<BntStack direction="row">
						{lastOperation
							? `${lastOperation?.direction}${lastOperation?.amount} ${formatDate(
									lastOperation?.date_utc
							  )}`
							: "..."}
					</BntStack>
				</BntTypography>
			</Button>
		</BntStack>
	);
};
