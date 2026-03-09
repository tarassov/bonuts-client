import { useCallback } from "react";
import { goBack, push } from "redux-first-history";

import { useAppDispatch, useAppSelector } from "services/redux/store/store";

type TNavigateParams = Parameters<typeof push>;

export interface ILocationProps extends Location {
	state: {
		from?: Location;
		background?: Location;
		modal?: boolean;
		name?: string;
		data?: any;
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

	return { location, navigate, goBack };
}
