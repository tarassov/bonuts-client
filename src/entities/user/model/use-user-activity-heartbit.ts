import { useEffect } from "react";

import { usePostUserActivityHeartbeatMutation } from "@/services/api/bonuts-api";

const HEARTBIT_INTERVAL_MS = 60_000;

interface IUseUserActivityHeartbitProps {
	isEnabled: boolean;
	tenant?: string;
}

export function useUserActivityHeartbit({ isEnabled, tenant }: IUseUserActivityHeartbitProps) {
	const [postUserActivityHeartbit] = usePostUserActivityHeartbeatMutation();

	useEffect(() => {
		if (!isEnabled || !tenant) {
			return;
		}

		const sendHeartbit = () => {
			postUserActivityHeartbit({ tenant }).catch(() => undefined);
		};

		const handleFocus = () => {
			sendHeartbit();
		};

		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") {
				sendHeartbit();
			}
		};

		sendHeartbit();
		const intervalId = window.setInterval(sendHeartbit, HEARTBIT_INTERVAL_MS);
		window.addEventListener("focus", handleFocus);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			window.clearInterval(intervalId);
			window.removeEventListener("focus", handleFocus);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [isEnabled, postUserActivityHeartbit, tenant]);
}
