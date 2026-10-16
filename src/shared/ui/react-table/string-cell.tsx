import { FC } from "react";

export const StringCell: FC<{ value: string | number }> = ({ value }) => {
	return <div className="pl-3">{value}</div>;
};
