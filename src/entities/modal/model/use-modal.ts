import { useContext } from "react";

import { useModalGeneric } from "@/shared/lib/modal";
import { DialogNamesContext } from "@/shared/ui/dialog";

import { type TModalConfig, type TModalResponse } from "./types";

export const useModal = () => {
	const modalNames = useContext(DialogNamesContext);

	return useModalGeneric<TModalConfig, TModalResponse>(modalNames);
};
