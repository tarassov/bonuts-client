import { ESeverity } from "@/shared/ui/notification";

export type TNotificationState = {
	isOpen: boolean;
	severity: ESeverity;
	message: string;
};
