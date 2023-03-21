import { FC, ReactNode } from "react";

export const BntCardBody: FC<{
	children: ReactNode | ReactNode[];
	className?: string;
}> = ({ children, className }) => {
	return <div className={className}>{children}</div>;
};
