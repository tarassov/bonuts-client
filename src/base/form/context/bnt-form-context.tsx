import { createContext, FC } from "react";
import { AppContextType } from "../../../types/context";
import { TFormValue } from "../types/bnt-form";

export type TBntFormContextType = (name: string, value: TFormValue) => void;
export const BntFormContext = createContext<TBntFormContextType>(() => {});
export const BntFormValuesContext = createContext<Record<string, TFormValue>>(
	{}
);

export const BntFormContextProvider: FC<{
	onChange: TBntFormContextType;
	values: Record<string, TFormValue>;
	children: JSX.Element | JSX.Element[];
}> = ({ onChange, children, values }) => {
	return (
		<BntFormContext.Provider value={onChange}>
			<BntFormValuesContext.Provider value={values}>
				{children}
			</BntFormValuesContext.Provider>
		</BntFormContext.Provider>
	);
};
