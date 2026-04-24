import * as React from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { parseSearchString } from "@/shared/lib/navigation";

import { type TVkResponse, VkCallback } from "@/features/profile/vk";

export function VkCallbackPage() {
	const location = useLocation();
	const params = useMemo(() => parseSearchString<TVkResponse>(location.search), [location.search]);

	return <VkCallback params={params} />;
}
