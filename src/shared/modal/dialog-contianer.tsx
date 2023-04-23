import { useContext } from "react";
import { BntDialog } from "shared/modal/dialog";
import {
	BntDialogCloseContext,
	BntDialogValueContext,
} from "shared/modal/dialog-context";

export const BntDialogContianer = () => {
	const modals = useContext(BntDialogValueContext);
	const handleClose = useContext(BntDialogCloseContext);
	return (
		<>
			{[...modals].map((modal) => {
				return (
					<BntDialog
						key={modal.modalKey}
						handleClose={() => handleClose(modal.modalKey)}
						modal={modal}
						open={Boolean(modal.modalKey)}
					>
						{modal.renderItem(modal)}
					</BntDialog>
				);
			})}
			)
		</>
	);
};
