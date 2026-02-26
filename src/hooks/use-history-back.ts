import { useEffect, useMemo, useRef } from "react";
import { NavigationType, useLocation, useNavigate, useNavigationType } from "react-router-dom";

/**
 * Keeps modal-like routes compatible with browser back navigation.
 *
 * What it does:
 * 1) On mount it pushes a "marker" history entry (`<originPath>?<key>`) and sets `{ modal: true }` state.
 * 2) When user presses Back and router reports a POP to that marker entry,
 *    it redirects to the original pathname and optionally calls `callback` when `prevent` is true.
 *
 * Typical use-case:
 * - A dialog is opened from `/employees`.
 * - The dialog should close when user clicks browser Back instead of leaving the module.
 *
 * @param args.key Unique marker for a flow (`"employee-edit"`, `"scheduler-create"`, etc.)
 * @param args.callback Optional side effect that runs when modal-close via back is intercepted.
 * @param args.prevent Enables callback execution on intercepted back navigation.
 *
 * @example
 * // Close employee dialog on browser Back
 * useHistoryBack({
 *   key: "employee-edit",
 *   prevent: true,
 *   callback: () => setIsDialogOpen(false),
 * });
 *
 * @example
 * // Simple route marker without callback side effects
 * useHistoryBack({ key: "plugin-create" });
 */
export const useHistoryBack = (args: { key: string; callback?: VoidFunction; prevent?: boolean }) => {
	const { callback, prevent, key } = args;
	const navigate = useNavigate();
	const location = useLocation();
	const navigationType = useNavigationType();

	// Persist origin route from first render.
	const originLocationRef = useRef(location.pathname);

	// Marker entry used to detect "Back closes modal" behavior.
	const backLocation = useMemo(() => {
		return `${originLocationRef.current}?${key}`;
	}, [key]);

	// Push a marker state into history on mount.
	useEffect(() => {
		navigate(backLocation, { state: { modal: true } });
	}, [backLocation, navigate]);

	// Intercept POP into the marker route and return user to origin page.
	useEffect(() => {
		const currentLocation = `${location.pathname}${location.search}`;

		if (navigationType === NavigationType.Pop && currentLocation === backLocation) {
			navigate(originLocationRef.current);
			if (prevent) callback?.();
		}
	}, [backLocation, callback, location.pathname, location.search, navigate, navigationType, prevent]);
};
