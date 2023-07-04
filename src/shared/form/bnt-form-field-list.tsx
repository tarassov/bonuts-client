import { FC } from "react";
import { BntFormItem } from "./bnt-form-item";
import { TFormProps } from "./types/bnt-form";

export const BntFormFieldList: FC<Pick<TFormProps<any>, "fields" | "formId" | "hasInitial">> = ({
	fields,
	formId,
}) => {
	return (
		<>
			{fields &&
				fields.map((field) => {
					const id = `${formId}|${String(field.name)}`;
					return <BntFormItem key={id} id={id} field={field} />;
				})}
		</>
	);
};
