import type { TCircle } from "@/types/model/circle";

export type TMetaItem = {
	label: string;
	value: string;
};

export type TModalEmployeeViewHeaderProps = {
	avatarUrl?: string | null;
	name?: string;
	position?: string | null;
	profileFallback: string;
	onClose: VoidFunction;
};

export type TModalEmployeeViewMetaProps = {
	metaItems: TMetaItem[];
	circles: TCircle[];
	hiddenCircleNames: string;
};

export type TModalEmployeeViewFooterProps = {
	goToLabel: string;
	onGoToEmployeeClick: VoidFunction;
};
