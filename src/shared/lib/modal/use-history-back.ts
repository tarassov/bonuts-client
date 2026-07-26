import { useEffect, useRef } from "react";
import { NavigationType, useLocation, useNavigate, useNavigationType } from "react-router-dom";

const HISTORY_BACK_MARKER = "__bntHistoryBackMarker";

type THistoryBackState = {
	[HISTORY_BACK_MARKER]?: string;
};

type TUseHistoryBackArgs = {
	callback: VoidFunction;
	enabled: boolean;
	key: string;
};

const getMarker = (state: unknown) => {
	if (typeof state !== "object" || state === null) return undefined;
	return (state as THistoryBackState)[HISTORY_BACK_MARKER];
};

export const useHistoryBack = ({ callback, enabled, key }: TUseHistoryBackArgs) => {
	const navigate = useNavigate();
	const location = useLocation();
	const navigationType = useNavigationType();

	// Keep lifecycle values stable without recreating the history marker.
	const markerRef = useRef(key);
	const callbackRef = useRef(callback);
	const navigateRef = useRef(navigate);
	const hasPushedMarkerRef = useRef(false);
	const handledBackRef = useRef(false);

	// Markers identify which modal owned the previous and current history entries.
	const previousMarkerRef = useRef(getMarker(location.state));
	const currentMarkerRef = useRef(getMarker(location.state));

	// Preserve the complete URL and state that existed when the modal opened.
	const originLocationRef = useRef({
		hash: location.hash,
		pathname: location.pathname,
		search: location.search,
		state: location.state,
	});

	callbackRef.current = callback;
	navigateRef.current = navigate;
	currentMarkerRef.current = getMarker(location.state);

	useEffect(() => {
		if (!enabled || hasPushedMarkerRef.current) return;

		const originLocation = originLocationRef.current;
		const originState = typeof originLocation.state === "object" && originLocation.state !== null ? originLocation.state : {};

		// Push the same visible URL with a marker, so Back consumes only this entry.
		hasPushedMarkerRef.current = true;
		navigateRef.current(
			{
				hash: originLocation.hash,
				pathname: originLocation.pathname,
				search: originLocation.search,
			},
			{
				state: {
					...originState,
					[HISTORY_BACK_MARKER]: markerRef.current,
				},
			}
		);

		return () => {
			// A regular close must remove the unused marker from browser history.
			if (!handledBackRef.current && currentMarkerRef.current === markerRef.current) {
				navigateRef.current(-1);
			}
		};
	}, [enabled]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <controlled>
	useEffect(() => {
		const previousMarker = previousMarkerRef.current;
		const currentMarker = getMarker(location.state);

		previousMarkerRef.current = currentMarker;

		// A POP away from this modal's marker means the user pressed Back.
		if (enabled && navigationType === NavigationType.Pop && previousMarker === markerRef.current && currentMarker !== markerRef.current) {
			handledBackRef.current = true;
			callbackRef.current();
		}
	}, [enabled, location.key, location.state, navigationType]);
};
