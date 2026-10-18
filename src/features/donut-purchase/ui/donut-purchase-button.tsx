import { ShoppingCartOutlined } from "@mui/icons-material";

import { BntButton } from "@/shared/ui/buttons";

import { Dictionary } from "@/constants/dictionary";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import type { TDonut } from "@/types/model";

interface IDonutPurchaseButtonProps {
	donut: TDonut;
	isPurchasing: boolean;
	isSubtle?: boolean;
	onPurchase: (donut: TDonut) => void;
}

export function DonutPurchaseButton({ donut, isPurchasing, isSubtle = false, onPurchase }: IDonutPurchaseButtonProps) {
	const { t } = useBntTranslate();

	const handlePurchase = () => {
		onPurchase(donut);
	};

	return (
		<BntButton
			data-testid="donut-purchase-button"
			disabled={isPurchasing}
			fullWidth
			noTransform
			onClick={handlePurchase}
			size="small"
			startIcon={<ShoppingCartOutlined />}
			variant={isSubtle ? "text" : "contained"}
		>
			{t(Dictionary.Buy)}
		</BntButton>
	);
}
