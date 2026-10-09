import { useCallback, useContext, useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import { omit } from "ramda";

import { DialogCloseContext, DialogControlsContext, DialogValueContext } from "./dialog-context";
import { DialogItem } from "./dialog-item";

export function BntDialogContainer() {
	const modals = useContext(DialogValueContext);
	const handleClose = useContext(DialogCloseContext);
	const { removeModal } = useContext(DialogControlsContext);
	const [loadingModal, setLoadingModal] = useState<Record<string, boolean>>({});
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const moduleSetLoading = useCallback((key: string, value: boolean) => {
		setLoadingModal((prev) => {
			return { ...prev, [key]: value };
		});
	}, []);

	// A modal that is gone must not leave its loading flag behind, the key can be reused.
	useEffect(() => {
		setLoadingModal((prev) => {
			const staleKeys = Object.keys(prev).filter((key) => !modals.some((modal) => modal.modalKey === key));

			return staleKeys.length > 0 ? omit(staleKeys, prev) : prev;
		});
	}, [modals]);

	return (
		<>
			{modals.map((modal) => (
				<DialogItem
					key={modal.modalKey}
					fullScreen={fullScreen}
					handleClose={handleClose}
					isLoading={loadingModal[modal.modalKey]}
					modal={modal}
					moduleSetLoading={moduleSetLoading}
					removeModal={removeModal}
				/>
			))}
		</>
	);
}
