import { Severity } from "@/types/system/severity";

export type TNotificationState = {
	isOpen: boolean;
	severity: Severity;
	message: string;
};
