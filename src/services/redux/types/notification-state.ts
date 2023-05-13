import { ESeverity } from "services/notification/types/severity";

export type TNotificationState = {
	isOpen: boolean;
	severity: ESeverity;
	message: string;
};
