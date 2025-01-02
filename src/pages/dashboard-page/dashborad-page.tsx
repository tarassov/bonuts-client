import { FC } from "react";
import { BntEventList } from "components/event/event-list/event-list";
import { AccountBalanceCard } from "components/account-balance/account-balance-card";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import classNames from "classnames";
import { BntStack } from "shared/ui/stack/stack";

export const DashboardPage: FC = () => {
	const theme = useTheme();
	const matchesDownMd = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Grid
			container
			flexDirection={matchesDownMd ? "column-reverse" : "row"}
			gap={matchesDownMd ? 2 : 0}
			className={classNames({ "height-100": !matchesDownMd })}
		>
			<Grid item xs={12} sm={12} md={8} lg={9} className="height-100">
				<BntEventList />
			</Grid>
			<Grid item xs={12} sm={12} md={4} lg={3}>
				<BntStack
					direction="row"
					justifyContent="flex-end"
					className={classNames("width-100", { "pl-2": !matchesDownMd })}
				>
					<BntStack gap={2} className="width-100">
						<AccountBalanceCard accountType="self" />
						<AccountBalanceCard accountType="distrib" />
					</BntStack>
				</BntStack>
			</Grid>
		</Grid>
	);
};
