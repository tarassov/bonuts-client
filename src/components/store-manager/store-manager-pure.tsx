import { FC, SyntheticEvent, useMemo, useState } from "react";
import { BntReactTable } from "shared/react-table/bnt-react-table";
import { useStoreTableConfig } from "components/store-manager/use-store-table-config";
import { BntTabs } from "shared/tab/bnt-tabs";
import { BntTab } from "shared/tab/bnt-tab";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTabPanel } from "shared/tab/bnt-tab-panel";
import { emptyFunction } from "utils/empty-function";
import { CardWrapper } from "shared/card-wrapper/card-wrapper";
import { TDonut } from "@/types/model";

export type StoreManagerPureProps = {
	donuts?: Array<TDonut>;
	onCreateClick?: VoidFunction;
};

export const StoreManagerPure: FC<StoreManagerPureProps> = ({ donuts, onCreateClick }) => {
	const { tableConfig } = useStoreTableConfig(onCreateClick);
	const { tableConfig: storeTableColumnsNotActive } = useStoreTableConfig(emptyFunction, true);
	const { translate } = useBntTranslate();
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const active = useMemo(() => donuts?.filter((x) => x.active) || [], [donuts]);
	const notActive = useMemo(() => donuts?.filter((x) => !x.active) || [], [donuts]);
	if (!donuts) return null;
	return (
		<div>
			<BntTabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				variant="fullWidth"
				aria-label="donuts tabs"
			>
				<BntTab label={translate("Active donuts")} tabValue={0} />
				<BntTab label={translate("Not active donuts")} tabValue={1} />
			</BntTabs>
			<CardWrapper>
				<BntTabPanel value={value} index={0}>
					<BntReactTable columns={tableConfig} data={active} />
				</BntTabPanel>
				<BntTabPanel value={value} index={1}>
					<BntReactTable columns={storeTableColumnsNotActive} data={notActive} />
				</BntTabPanel>
			</CardWrapper>
		</div>
	);
};
