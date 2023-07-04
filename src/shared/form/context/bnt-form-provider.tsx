import { createContext, FC } from "react";
import { TFormValue } from "../types/bnt-form";

export type TBntFormContextType = (name: string, value: TFormValue) => void;
export const BntFormProvider = createContext<TBntFormContextType>(() => {});
export const BntFormValuesContext = createContext<Record<string, TFormValue>>({});
export const BntFormInitialsValuesContext = createContext<Record<string, any>>({});

export const BntFormContextProvider: FC<{
	values: Record<string, TFormValue>;
	initialValues?: Record<string, any>;
	children: JSX.Element | JSX.Element[];
}> = ({ children, values, initialValues = {} }) => {
	return (
		<BntFormValuesContext.Provider value={values}>
			<BntFormInitialsValuesContext.Provider value={initialValues}>
				{children}
			</BntFormInitialsValuesContext.Provider>
		</BntFormValuesContext.Provider>
	);
};
