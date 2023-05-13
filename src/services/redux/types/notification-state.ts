import { ESeverity } from "services/notification/types/ESeverity";

export type TNotificationState = {
	isOpen: boolean;
	severity: ESeverity;
	message: string;
};
