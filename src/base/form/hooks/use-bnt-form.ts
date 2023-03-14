import { useContext } from "react";
import {
	BntFormProvider,
	BntFormValuesContext,
} from "../context/bnt-form-provider";

export const useBntForm = () => {
	const onChange = useContext(BntFormProvider);
	const values = useContext(BntFormValuesContext);

	return { onChange, values };
};
