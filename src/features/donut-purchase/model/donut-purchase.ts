import type { TDonut } from "@/types/model";

export const canPurchaseDonut = (donut: TDonut, balance?: number) => {
	return typeof balance === "number" && donut.available && balance >= donut.price;
};
