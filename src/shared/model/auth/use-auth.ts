import { useState } from "react";
import { push } from "redux-first-history";

import {
	bonutsApi,
	PostAuthenticateApiArg,
	usePostAuthenticateMutation,
	usePostDemoAuthenticateMutation,
	usePostLogoutMutation,
} from "services/api/bonuts-api";
import { authActions } from "services/redux/slice/auth-slice";
import { useAppDispatch, useAppSelector } from "services/redux/store/store";
import { storage } from "shared/lib/localStorage";

import { resolveCurrentTenant } from "./resolve-current-tenant";

// const MAX_RETRY_NUMBER = 3;

// TODO: now we use localStorage for saving auth_token. We should remove it as soon as new backend will be deployed since it is unsave and we should use only cookie for jwt
export function useAuth() {
	const dispatch = useAppDispatch();
	const { authenticate } = authActions;
	const auth = useAppSelector((store) => store.auth);

	const [postAuthenticate, { isLoading: isLogging, error: authError }] = usePostAuthenticateMutation();
	const [postDemoAuthenticate, { isLoading: isDemoLogging, error: authDemoError }] = usePostDemoAuthenticateMutation();
	const [postLogout] = usePostLogoutMutation();

	const { getValue, setValue } = storage;
	const [isAuthLoading, setIsAuthLoading] = useState(true);

	const persistAuth = (payload: { auth_token: string; currentTenant?: string; tenants: Array<{ name?: string | null }> }) => {
		setValue<string>("auth_token", payload.auth_token);
		setValue<string>("tenant", resolveCurrentTenant(payload));
	};

	const getAuth = (): TAuth => {
		return {
			token: getValue("auth_token") || "",
			tenant: getValue("tenant") || "",
		};
	};
	const validateAuth = async (authToValidate: TAuth): Promise<boolean> => !!authToValidate.token;

	const signIn = async (credentials: PostAuthenticateApiArg) => {
		try {
			const trimmedCredentials: PostAuthenticateApiArg = {
				body: { email: credentials.body.email.trim(), password: credentials.body.password },
			};
			const payload = await postAuthenticate(trimmedCredentials).unwrap();
			persistAuth(payload);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	};

	const demoSignIn = async () => {
		try {
			const payload = await postDemoAuthenticate().unwrap();
			persistAuth(payload);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	};

	const signOut = async () => {
		setValue<string | null>("auth_token", null);
		setValue<string | null>("tenant", null);
		postLogout().finally(() => {
			dispatch(push("/login"));
			dispatch(bonutsApi.util.resetApiState());
		});
	};

	const checkAuth = async () => {
		setIsAuthLoading(true);
		try {
			const savedAuth = getAuth(); // get token from the storage
			if (savedAuth.token) {
				const checkResult = await validateAuth(savedAuth); // check if token is valid
				if (checkResult) {
					dispatch(authenticate(savedAuth)); // push token to the store-manager
					return true;
				}
				setValue<string>("auth_token", "");
				dispatch(push("/login"));
				return false;
			}
			return false;
		} finally {
			setIsAuthLoading(false);
		}
	};
	const setTenant = (name: string) => {
		setValue<string | null>("tenant", name);
		checkAuth();
	};

	return {
		isLogging: isLogging || isDemoLogging,
		isAuthLoading,
		authError: authError || authDemoError,
		signIn,
		demoSignIn,
		signOut,
		getAuth,
		checkAuth,
		auth,
		setTenant,
	};
}
