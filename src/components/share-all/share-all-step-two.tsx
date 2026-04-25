import type { FC } from "react";
import { Grid } from "@mui/material";

import { BntBox } from "@/shared/ui/box";
import { BntRoundButton } from "@/shared/ui/buttons";
import { BntStack } from "@/shared/ui/stack";

import { EmployeeListCompact } from "@/widgets/employee-directory";

import { ShareAllForm } from "@/components/share-all/share-all-form";
import { Currency } from "@/constants/currency";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_b } from "@/services/localization/texts";
import type { TProfile } from "@/types/model";
import { emptyFunction } from "@/utils/empty-function";

export const ShareAllStepTwo: FC<{
	profiles?: Array<TProfile>;
	back?: VoidFunction;
	next?: (args: { amount: number; comment: string; type: Currency }) => void;
}> = ({ profiles, back = emptyFunction, next = emptyFunction }) => {
	const { t } = useBntTranslate();
	return (
		<>
			<BntBox className="m-4">
				<BntStack direction="row" alignItems="center" justifyContent="flex-start" className="mt-4 mb-4">
					<BntRoundButton variant="outlined" onClick={back}>
						{`< `}
						{t(texts_b.back)}
					</BntRoundButton>
				</BntStack>
				<Grid className="mb-4" container columnSpacing={2} rowSpacing={2}>
					<Grid item xs={12}>
						<BntBox sx={{ maxHeight: "200px" }} className="scroll">
							<EmployeeListCompact profiles={profiles || []} onClick={emptyFunction} hideSearch />
						</BntBox>
					</Grid>
				</Grid>
				<ShareAllForm onSuccess={next} />
			</BntBox>
		</>
	);
};
