import type { TCircle } from "@/types/model/circle";

export type TMetaItem = {
	label: string;
	value: string;
};

export type TModalEmployeeViewHeaderProps = {
	avatarUrl?: string | null;
	name?: string;
	position?: string | null;
	recognitionBadgeTitle?: string;
	profileFallback: string;
	onClose: VoidFunction;
};

export type TModalEmployeeViewMetaProps = {
	circles: TCircle[];
	hiddenCircleNames: string;
	metaItems: TMetaItem[];
};

export type TModalEmployeeViewFooterProps = {
	goToLabel: string;
	transferLabel?: string;
	onGoToEmployeeClick: VoidFunction;
	onTransferClick?: VoidFunction;
};
