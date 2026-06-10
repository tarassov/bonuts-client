import { useCallback, useContext, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import _ from "lodash";

import { DialogCloseContext, DialogValueContext } from "./dialog-context";
import { DialogItem } from "./dialog-item";

export function BntDialogContainer() {
	const modals = useContext(DialogValueContext);
	const handleClose = useContext(DialogCloseContext);
	const [loadingModal, setLoadingModal] = useState<Record<string, boolean>>({});
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const moduleSetLoading = useCallback((key: string, value: boolean) => {
		setLoadingModal((prev) => {
			return { ...prev, [key]: value };
		});
	}, []);

	return (
		<>
			{[...modals].map((modal) => {
				const title = modal.title ? (_.isFunction(modal.title) ? modal.title(modal) : modal.title) : "";
				const isLoading = loadingModal[modal.modalKey];

				return <DialogItem key={modal.modalKey} fullScreen={fullScreen} handleClose={handleClose} isLoading={isLoading} modal={modal} moduleSetLoading={moduleSetLoading} title={title} />;
			})}
		</>
	);
}
