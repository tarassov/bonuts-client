import { createContext, FC } from "react";
import { TFormValue } from "../types/bnt-form";

export type TBntFormContextType = (name: string, value: TFormValue) => void;
export const BntFormProvider = createContext<TBntFormContextType>(() => {});
export const BntFormValuesContext = createContext<Record<string, TFormValue>>(
	{}
);

export const BntFormContextProvider: FC<{
	onChange: TBntFormContextType;
	values: Record<string, TFormValue>;
	children: JSX.Element | JSX.Element[];
}> = ({ onChange, children, values }) => {
	return (
		<BntFormProvider.Provider value={onChange}>
			<BntFormValuesContext.Provider value={values}>
				{children}
			</BntFormValuesContext.Provider>
		</BntFormProvider.Provider>
	);
};
