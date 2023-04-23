import { FC } from "react";

export const TextModal: FC<{ text?: string }> = ({ text }) => {
	return <div>{text}</div>;
};
