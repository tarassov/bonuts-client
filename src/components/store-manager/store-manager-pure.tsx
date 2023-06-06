import { FC, SyntheticEvent, useMemo, useState } from "react";
import { BntReactTable } from "shared/react-table/bnt-react-table";
import { useStoreTableConfig } from "components/store-manager/use-store-table-config";
import { BntTabs } from "shared/tab/bnt-tabs";
import { BntTab } from "shared/tab/bnt-tab";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTabPanel } from "shared/tab/bnt-tab-panel";
import { BntTransparentButton } from "shared/buttons/transparent-button";
import { AddOutlined } from "@mui/icons-material";
import { texts_c } from "services/localization/texts";
import { Stack } from "@mui/material";
import { TDonut } from "@/types/model";

export type StoreManagerPureProps = {
	donuts?: Array<TDonut>;
};

export const StoreManagerPure: FC<StoreManagerPureProps> = ({ donuts }) => {
	const { storeTableColumns } = useStoreTableConfig();
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
			<Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-end">
				<BntTransparentButton color="primary">
					<AddOutlined />
					{translate(texts_c.create)}
				</BntTransparentButton>
			</Stack>
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
			<BntTabPanel value={value} index={0}>
				<BntReactTable columns={storeTableColumns} data={active} />
			</BntTabPanel>
			<BntTabPanel value={value} index={1}>
				<BntReactTable columns={storeTableColumns} data={notActive} />
			</BntTabPanel>
		</div>
	);
};
