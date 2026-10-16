import { FC } from "react";

import { useBntTranslate } from "hooks/use-bnt-translate";
import type { PutDonutsByIdApiResponse } from "services/api/bonuts-api";
import { texts_a, texts_d, texts_m, texts_p, texts_s } from "services/localization/texts";

import { BntForm, BntSwitchField, SubmitButtonVariant, type TFieldGroup, TFormProps } from "@/shared/ui/form";

import { useDonutEditFormFields } from "../model/use-donut-edit-form-fields";

import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { TDonut } from "@/types/model";

export const DonutEditForm: FC<{
	donut: TDonut;
	onImageChange?: (file: File) => void;
	onSubmit: (values: TDonut) => Promise<{ data: PutDonutsByIdApiResponse } | { error: FetchBaseQueryError | SerializedError } | undefined> | undefined;
}> = ({ onImageChange, onSubmit, donut }) => {
	const { fields } = useDonutEditFormFields(onImageChange);
	const { t } = useBntTranslate();
	const panelStyles: TFieldGroup["sx"] = (theme) => ({
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: 2,
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2.5),
	});
	const groups: Array<TFieldGroup> = [
		{
			id: 10,
			md: 4,
			xs: 12,
			padding: { p: 1 },
			groups: [{ id: 11, xs: 12, title: t(texts_p.picture), sx: panelStyles }],
		},
		{
			id: 20,
			md: 8,
			xs: 12,
			padding: { p: 1 },
			groups: [
				{ headerContent: <BntSwitchField disabledLabel={texts_d.disabled_reward} label={texts_a.active} name="active" />, id: 21, xs: 12, title: t(texts_m.main_reward_information), sx: panelStyles },
				{ description: t(texts_s.stock_configuration_description), id: 22, xs: 12, title: t(texts_a.availability), sx: panelStyles },
			],
		},
	];
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
		keepDirtyOnInitialValuesChange: true,
		isSubmitSticky: true,
		submitButtonVariant: SubmitButtonVariant.brandGradient,
	};

	return <BntForm hasInitial {...formProps} />;
};
