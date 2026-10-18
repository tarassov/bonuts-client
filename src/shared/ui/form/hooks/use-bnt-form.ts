import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { BntFormInitialsValuesContext, BntFormValuesContext } from "../context/bnt-form-provider";
import { TFormValue } from "../types/bnt-form";

export const useBntForm = () => {
	const methods = useFormContext();
	const onChange = (name: string, value: TFormValue) => {
		methods.setValue(name, value, { shouldDirty: true });
	};
	const values = useContext(BntFormValuesContext);
	const initialValues = useContext(BntFormInitialsValuesContext);
	return { onChange, values, initialValues };
};
