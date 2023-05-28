import { useContext } from "react";
import {
	BntFormInitialsValuesContext,
	BntFormProvider,
	BntFormValuesContext,
} from "../context/bnt-form-provider";

export const useBntForm = () => {
	const onChange = useContext(BntFormProvider);
	const values = useContext(BntFormValuesContext);
	const initialValues = useContext(BntFormInitialsValuesContext);
	return { onChange, values, initialValues };
};
