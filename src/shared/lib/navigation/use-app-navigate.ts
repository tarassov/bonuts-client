import { useCallback } from "react";
import { goBack, go as historyGo, push, replace } from "redux-first-history";

import { useAppDispatch, useAppSelector } from "services/redux/store/store";

type TNavigateParams = Parameters<typeof push>;

export interface ILocationProps extends Location {
	state: {
		from?: Location;
		background?: Location;
		modal?: boolean;
		name?: string;
		data?: any;
		// Key of the modal this entry declares, so it can be reopened on a reload or a Forward.
		modalKey?: string;
		// Depth of this entry in the chain of opened modals, which orders them without browser history internals.
		modalIndex?: number;
	};
}

export function useAppNavigate() {
	const dispatch = useAppDispatch();
	const location = useAppSelector((state) => state.router.location as unknown as ILocationProps);

	const navigate = useCallback(
		(...params: TNavigateParams) => {
			return dispatch(push(...params));
		},
		[dispatch]
	);

	const replaceEntry = useCallback(
		(...params: TNavigateParams) => {
			return dispatch(replace(...params));
		},
		[dispatch]
	);

	const back = useCallback(() => {
		return dispatch(goBack());
	}, [dispatch]);

	// Several entries have to be dropped in one traverse: consecutive back calls are not reliable in browsers.
	const go = useCallback(
		(delta: number) => {
			return dispatch(historyGo(delta));
		},
		[dispatch]
	);

	return { go, location, navigate, replace: replaceEntry, goBack: back };
}
