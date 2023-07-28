import { FC } from "react";
import { BntStack } from "shared/stack/stack";
import { BntTypography } from "shared/typography/typography";

export const AccountBallanceMainInfo: FC<{
	title: string;
	balance?: number;
	value: React.ReactNode;
	lastOperation?: { direction?: "+" | "-"; amount?: number; date?: string };
}> = ({ title, value, lastOperation, balance }) => {
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
			<BntTypography variant="caption" color="grey.700">
				<BntStack direction="row">
					{`${lastOperation?.direction}${lastOperation?.amount} ${lastOperation?.date}`}
				</BntStack>
			</BntTypography>
		</BntStack>
	);
};
