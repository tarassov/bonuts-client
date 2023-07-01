import { TFormProps } from "shared/form/types/bnt-form";
import { BntForm } from "shared/form/bnt-form";
import { FC } from "react";
import { useDonutEditFormFields } from "components/donut/donut-edit/hooks/use-donut-edit-form-fields";
import { PutDonutsByIdApiResponse } from "services/api/bonuts-api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { TDonut } from "@/types/model";

export const DonutEditForm: FC<{
	donut: TDonut;
	onSubmit: (
		values: TDonut
	) =>
		| Promise<
				| { data: PutDonutsByIdApiResponse }
				| { error: FetchBaseQueryError | SerializedError }
				| undefined
		  >
		| undefined;
}> = ({ onSubmit, donut }) => {
	const { fields, groups } = useDonutEditFormFields();
	const handleSubmit = (values: TDonut) => {
		return onSubmit(values);
	};
	const formProps: TFormProps<TDonut> = {
		fields,
		formId: "edit-donut",
		groups,
		groupGap: 0,
		onSubmit: handleSubmit,
		initialValues: donut,
	};

	return (
		<div className="p-8">
			<BntForm hasInitial {...formProps} />
		</div>
	);
};
