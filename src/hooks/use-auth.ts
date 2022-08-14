import { AsyncThunk, SerializedError, unwrapResult } from "@reduxjs/toolkit";

import { useNavigate } from "react-router-dom";
// import { IReposnse, ILoginRequest, IRegisterRequest } from "../api/types";
// import { fireError } from "../services/actions/system-actions";
import { usePostAuthenticateMutation } from "../services/api/bonuts-api";
import { useAppDispatch, useAppSelector } from "../services/store/store";
import { useStorage } from "./use-storage";

const MAX_RETRY_NUMBER = 3;

export function useAuth() {
	const dispatch = useAppDispatch();
	const user = useAppSelector((store) => store.user);
	const [postAuthenticate, { isLoading }] = usePostAuthenticateMutation();
	const { getValue, setValue } = useStorage();

	const navigate = useNavigate();
	const dismissErrors = () => {
		if (user.error) dispatch(dismissErrorsAction());
	};

	const saveToken = (token: string) => {
		setValue<string>("token", token);
	};
	const getToken = () => {
		return getValue("token");
	};

	const signIn = async (credentials: { email: string; password: string }) => {
		postAuthenticate({ body: credentials });
	};

	const signOut = async () => {
		setValue("token", null);
	};

	const register = async (credentials: IRegisterRequest) => {
		return dispatch(registerAction(credentials))
			.then(unwrapResult)
			.then(saveTokens)
			.catch((e: SerializedError) => console.log(e.message));
	};

	const checkAuth = async () => {
		if (savedToken()) {
			dispatch(authenticate(true));
			if (accessToken()) {
				refreshToken(false).then((result) => {
					if (result.error) {
						setSavedToken("");
						dispatch(authenticate(false));
						navigate("/login");
					} else {
						saveTokens(result);
					}
				});
			}
		} else {
			dispatch(authenticate(false));
		}
	};

	return {
		isLoading,
		user,
		checkAuth,
		signIn,
		signOut,
		register,
		dismissErrors,
		secureDispatch,
		accessToken,
	};
}
