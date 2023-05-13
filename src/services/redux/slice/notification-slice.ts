import { createSlice } from "@reduxjs/toolkit";
import { TNotificationState } from "services/redux/types/notification-state";
import { ESeverity } from "services/notification/types/severity";

const initialState: TNotificationState = {
	isOpen: false,
	severity: ESeverity.Success,
	message: "",
};
export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification: (state, action) => {
			state.isOpen = true;
			state.severity = action.payload.severity;
			state.message = action.payload.message;
		},
		clearNotification: (state) => {
			state.isOpen = false;
			state.severity = ESeverity.Success;
			state.message = "";
		},
	},
});

export const notificationActions = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
