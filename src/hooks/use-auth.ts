import { useState, useEffect } from "react";
import { push } from "redux-first-history";
import {
	bonutsApi,
	PostAuthenticateApiArg,
	PostRegisterApiArg,
	useGetProfileQuery,
	usePostAuthenticateMutation,
	usePostRegisterMutation,
} from "../services/api/bonuts-api";
import { authenticate, logout } from "../services/redux/auth-slice";
import { useAppDispatch, useAppSelector } from "../services/store/store";
import { useStorage } from "./use-storage";

// const MAX_RETRY_NUMBER = 3;

//TODO: now we use localStorage for saving auth_token. We should remove it as soon as new backend wiil be deployed since it is unsave and we should use only cookie for jwt
export function useAuth() {
	const dispatch = useAppDispatch();
	const auth = useAppSelector((store) => store.auth);
	const [skip, setSkip] = useState(true);
	const [postAuthenticate, { isLoading: isLogging, error: authError }] =
		usePostAuthenticateMutation();

	const { data: profile } = useGetProfileQuery(
		{ tenant: auth.tenant || "" },
		{
			skip,
		}
	);

	const [postRegister, { isLoading: isPostingRegister, error: registerError }] =
		usePostRegisterMutation();
	const { getValue, setValue } = useStorage();
	const [isAuthLoading, setIsAuthLoading] = useState(true);

	// const navigate = useNavigate();
	// const dismissErrors = () => {
	// 	if (user.error) dispatch(dismissErrorsAction());

	useEffect(() => {
		if (auth.token) {
			setSkip(false);
		} else {
			setSkip(true);
		}
	}, [auth]);

	const getAuth = (): TAuth => {
		return {
			token: getValue<string>("auth_token") || "",
			tenant: getValue<string>("tenant") || "",
		};
	};
	const validateAuth = async (auth: TAuth): Promise<boolean> => {
		if (auth.token) {
			return true;
		}
		return false;
	};

	const signIn = async (credentials: PostAuthenticateApiArg) => {
		try {
			const payload = await postAuthenticate(credentials).unwrap();
			let current_tenant = "";
			if (payload.current_tenant) {
				current_tenant = payload.current_tenant.name;
			} else if (payload.tenants.length === 1) {
				current_tenant = payload.tenants[0].name;
			}
			setValue<string>("auth_token", payload.auth_token);
			setValue<string>("tenant", current_tenant);
		} catch (err) {
			console.log(err);
		}
	};

	const signOut = async () => {
		setValue<string | null>("auth_token", null);
		setValue<string | null>("tenant", null);
		dispatch(bonutsApi.util.resetApiState());
		dispatch(logout());
	};

	const register = async (credentials: PostRegisterApiArg) => {
		postRegister(credentials);
	};

	const checkAuth = async () => {
		setIsAuthLoading(true);
		try {
			const savedAuth = getAuth(); //get token from the storage
			if (savedAuth.token) {
				const checkResult = await validateAuth(savedAuth); //check if token is valid
				if (checkResult) {
					dispatch(authenticate(savedAuth)); //push token to the store
					return true;
				} else {
					setValue<string>("auth_token", "");
					dispatch(push("/login"));
					return false;
				}
			}
			return false;
		} finally {
			setIsAuthLoading(false);
		}
	};

	return {
		isLogging,
		isPostingRegister,
		isAuthLoading,
		registerError,
		authError,
		signIn,
		signOut,
		register,
		getAuth,
		checkAuth,
		auth,
		profile,
	};
}
