import { useContext } from "react";

import { type BntModalRegistry, DialogNamesContext } from "@/shared/ui/dialog";

import { useModalGeneric } from "./use-modal-generic";

/**
 * Modals of the application, typed by the registry the app config fills in.
 * `ImageModal.show({ url })` and its result are checked against the modal declaration in modal-config.
 */
export const useModal = () => {
	const modalNames = useContext(DialogNamesContext);

	return useModalGeneric<BntModalRegistry>(modalNames);
};
