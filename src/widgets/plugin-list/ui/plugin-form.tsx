import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FormContainer } from "react-hook-form-mui";

import { BntCard } from "shared/ui/card/card";
import { BntFormSubmit } from "shared/ui/form/bnt-form-submit";
import { BntTextInputElement } from "shared/ui/input/text-input-element";
import { BntTypography } from "shared/ui/typography/typography";

import { emptyFunction } from "utils/empty-function";

import { texts_n } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { TPlugin } from "@/types/model";
import { PluginHeader } from "@/widgets/plugin-list/ui/plugin-header";

export const PluginForm: FC<{
	plugin: TPlugin;
	onSubmit?: (plugin: TPlugin) => void;
	onCancel?: VoidFunction;
	submitCaption?: string;
	className?: string;
}> = ({ onSubmit = emptyFunction, onCancel = emptyFunction, plugin, submitCaption, className }) => {
	const formContext = useForm({
		defaultValues: plugin,
	});
	const { control } = formContext;
	const { fields } = useFieldArray({
		control,
		name: "settings",
	});

	const handleSubmit = (value: TPlugin) => {
		// eslint-disable-next-line no-console
		console.log(value);
		onSubmit(value);
	};

	return (
		<BntCard className={className} sx={{ padding: 2 }}>
			<PluginHeader plugin={plugin} />
			<FormContainer
				formContext={formContext}
				onSuccess={handleSubmit}
				onError={(e) => console.error(e)}
			>
				{fields.map((item, index) => (
					<BntTextInputElement
						margin="normal"
						fullWidth
						required
						key={item.id}
						name={`settings.${index}.value`}
						label={item.name}
						autoFocus
					/>
				))}

				<BntFormSubmit visible onCancelClick={onCancel} submitCaption={submitCaption} />
			</FormContainer>
		</BntCard>
	);
};
