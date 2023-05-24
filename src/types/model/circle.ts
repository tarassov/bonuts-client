import { TBaseModel } from "@/types/model/base-model";

export type TCircle = TBaseModel & {
	name?: string;
	active?: boolean;
};
