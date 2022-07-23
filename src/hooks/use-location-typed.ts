import { useLocation } from "react-router-dom";

export interface ILocationProps extends Location {
	state: {
		from?: Location;
		background?: Location;
	};
}

export function useLocationTyped() {
	const location = useLocation() as unknown as ILocationProps;

	return location;
}
