import { useContext, useEffect, useState } from "react";
import {
	NavigationType,
	UNSAFE_NavigationContext,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { History, Update } from "history";

export const useHistoryBack = (args: {
	key: string;
	callback?: VoidFunction;
	prevent?: boolean;
}) => {
	const { callback, prevent, key } = args;
	const navigate = useNavigate();
	const location = useLocation();
	const [originLocation] = useState(location.pathname);
	const getLocation = () => {
		return `${location.pathname}?${key}`;
	};
	useEffect(() => {
		navigate(getLocation(), { state: { modal: true } });
	}, []);

	const navigator = useContext(UNSAFE_NavigationContext).navigator as History;

	useEffect(() => {
		const listener = ({ location: currentLocation, action }: Update) => {
			if (action === NavigationType.Pop && currentLocation.pathname === getLocation()) {
				navigate(originLocation);
				if (prevent) callback?.();
			}
		};

		return () => {
			navigator.listen(listener);
		};
	}, [callback, navigator]);
};
