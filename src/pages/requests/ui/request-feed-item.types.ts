import type { ReactNode } from "react";

import type { TRequest } from "@/types/model/request";

export type TRequestItemAction = {
	icon?: ReactNode;
	label: string;
	onClick: () => void;
	tone: "primary" | "success" | "error";
};

export type RequestFeedItemProps = {
	isMyRequestView?: boolean;
	primaryAction?: TRequestItemAction;
	request: TRequest;
	secondaryAction?: TRequestItemAction;
};
