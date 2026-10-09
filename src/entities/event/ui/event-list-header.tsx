import { RedeemOutlined } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_g } from "services/localization/texts";

import { BntBox } from "@/shared/ui/box";
import { BntActionButton, BntActionButtonVariant } from "@/shared/ui/buttons";
import { SearchString } from "@/shared/ui/search-string";
import { BntStack, BntStackVariant } from "@/shared/ui/stack";

import { EventFilterMenu } from "./event-filter-menu";

type TEventListHeaderProps = {
	hasEvents: boolean;
	showMine: boolean;
	onGiveDonutClick: VoidFunction;
	onSearchTextChange: (search: string) => void;
	onShowMineToggle: VoidFunction;
};

export function EventListHeader({ hasEvents, showMine, onGiveDonutClick, onSearchTextChange, onShowMineToggle }: TEventListHeaderProps) {
	const { translate } = useBntTranslate();

	return (
		<BntStack
			direction={{ xs: "column", sm: "row" }}
			gap={1.5}
			alignItems={{ xs: "stretch", sm: "center" }}
			variant={BntStackVariant.surface}
			sx={{
				p: 1,
				maxWidth: 760,
				width: "100%",
				alignSelf: "center",
			}}
		>
			<BntActionButton icon={<RedeemOutlined />} onClick={onGiveDonutClick} text={translate(texts_g.give_donuts, { capitalize: true })} variant={BntActionButtonVariant.brandGradient} />
			{hasEvents ? (
				<>
					<BntBox sx={{ flex: 1, minWidth: 0 }}>
						<SearchString setSearch={onSearchTextChange} debounceDelay={500} className="flex-grow" variant="surface" />
					</BntBox>
					<EventFilterMenu showMine={showMine} onShowMineToggle={onShowMineToggle} />
				</>
			) : null}
		</BntStack>
	);
}
