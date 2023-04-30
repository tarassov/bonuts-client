import { styled } from "@mui/material/styles";
import { ModalImageComponent } from "components/modals/modal-image/modal-image-component";
import { cl } from "themes/helper";
import { MODAL_IMAGE_CLASSES } from "components/modals/modal-image/classes";

export const ModalImage = styled(
	ModalImageComponent,
	{}
)(({ theme }) => {
	return {
		fontSize: "0",
		verticalAlign: "top",
		maxHeight: "600px",
		[cl(MODAL_IMAGE_CLASSES.modalImage)]: {
			display: "block",
			maxWidth: "100%",
			maxHeight: "100%",
			verticalAlign: "top",
		},
	};
});
