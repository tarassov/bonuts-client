import { useContext } from "react";
import {
	BntFormContext,
	BntFormValuesContext,
} from "../context/bnt-form-context";

export const useBntForm = () => {
	const onChange = useContext(BntFormContext);
	const values = useContext(BntFormValuesContext);

	return { onChange, values };
};
