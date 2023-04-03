import { FC, useContext } from "react";
import {
	BntDialogContext,
	BntDialogValueContext,
} from "../../shared/modal/dialog-provider";
import { TBntModal, TBntModalContentProps } from "../../shared/types/dialog";

export const TextModal: FC<TBntModalContentProps> = ({ modal }) => {
	const modals = useContext(BntDialogValueContext);
	const data = modals[modal?.key || ""];
	return <div>{data?.data?.["text"]}</div>;
};
