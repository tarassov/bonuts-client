import { emptySplitApi as api } from "services/api/empty-api";
import { authReducer } from "services/redux/slice/auth-slice";
import { notificationReducer } from "services/redux/slice/notification-slice";

export const reducers = {
	[api.reducerPath]: api.reducer,
	auth: authReducer,
	notification: notificationReducer,
};
