import { FC, useContext } from "react";
import { BntDialogValueContext } from "shared/modal/dialog-provider";
import { TBntModalContentProps } from "shared/types/dialog";

export const TextModal: FC<TBntModalContentProps> = ({ modal }) => {
	const modals = useContext(BntDialogValueContext);
	// eslint-disable-next-line react/destructuring-assignment
	const data = modals[modal?.key || ""];
	return <div>{data?.data?.text}</div>;
};
