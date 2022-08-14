// import { AsyncThunk, SerializedError, unwrapResult } from "@reduxjs/toolkit";

// import { useNavigate } from "react-router-dom";
// // import { IReposnse, ILoginRequest, IRegisterRequest } from "../api/types";
// import { fireError } from "../services/actions/system-actions";
import {
	PostAuthenticateApiArg,
	PostRegisterApiArg,
	usePostAuthenticateMutation,
	usePostRegisterMutation,
} from "../services/api/bonuts-api";
// import { useAppDispatch, useAppSelector } from "../services/store/store";
import { useStorage } from "./use-storage";

// const MAX_RETRY_NUMBER = 3;

export function useAuth() {
	// const dispatch = useAppDispatch();
	// const auth = useAppSelector((store) => store.auth);
	const [postAuthenticate, { isLoading, error }] =
		usePostAuthenticateMutation();
	const [postRegister, { isLoading: isPostingRegister, error: registerError }] =
		usePostRegisterMutation();
	const { getValue, setValue } = useStorage();

	// const navigate = useNavigate();
	// const dismissErrors = () => {
	// 	if (user.error) dispatch(dismissErrorsAction());
	// };

	const getToken = () => {
		return getValue("auth_token");
	};

	const signIn = async (credentials: PostAuthenticateApiArg) => {
		try {
			const payload = await postAuthenticate(credentials).unwrap();
			setValue<string>("auth_token", payload.auth_token);
			setValue<string>("tenant", payload.current_tenant?.name || "");
		} catch (err) {
			console.log(err);
		}
	};

	const signOut = async () => {
		setValue("token", null);
	};

	const register = async (credentials: PostRegisterApiArg) => {
		postRegister(credentials);
	};

	return {
		isLoading,
		isPostingRegister,
		registerError,
		error,
		signIn,
		signOut,
		register,
		getToken,
	};
}
