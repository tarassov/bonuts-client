import { FC } from "react";
import { BntFormItem } from "./bnt-form-item";
import { TFormProps } from "./types/bnt-form";
import { useBntForm } from "./hooks/use-bnt-form";

export const BntFormFieldList: FC<Pick<TFormProps, "fields" | "formId" | "hasInitial">> = ({
	fields,
	hasInitial,
	formId,
}) => {
	const { values } = useBntForm();
	return (
		<>
			{fields &&
				fields.map((field) => {
					const id = `${formId}|${String(field.name)}`;
					return (
						<BntFormItem
							key={id}
							id={id}
							field={field}
							value={hasInitial ? values?.[String(field.name)] : undefined}
						/>
					);
				})}
		</>
	);
};
