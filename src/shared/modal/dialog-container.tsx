import { useContext } from "react";
import { BntDialog } from "shared/modal/dialog";
import {
	BntDialogCloseContext,
	BntDialogValueContext,
} from "shared/modal/dialog-context";
import { BntStack } from "shared/stack/stack";
import { IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

export const BntDialogContainer = () => {
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
						<div>
							{modal.hasTopMenu ? (
								<BntStack
									className="pr-10"
									direction="row"
									justifyContent="flex-end"
								>
									<IconButton onClick={() => handleClose(modal.modalKey)}>
										<CloseOutlined />
									</IconButton>
								</BntStack>
							) : null}
							{modal.renderItem(modal)}
						</div>
					</BntDialog>
				);
			})}
			)
		</>
	);
};
