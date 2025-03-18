import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FormContainer } from "react-hook-form-mui";

import { BntFormSubmit } from "shared/ui/form/bnt-form-submit";
import { BntTextInputElement } from "shared/ui/input/text-input-element";

import { emptyFunction } from "utils/empty-function";

import { texts_n } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { TPlugin } from "@/types/model";

export const PluginForm: FC<{
	defaultValue?: TPlugin;
	onSubmit?: (plugin: TPlugin) => void;
	onCancel?: VoidFunction;
	submitCaption?: string;
	className?: string;
}> = ({
	onSubmit = emptyFunction,
	onCancel = emptyFunction,
	defaultValue,
	submitCaption,
	className,
}) => {
	const { t } = useBntTranslate();

	const formContext = useForm({
		defaultValues: defaultValue,
	});
	const { control } = formContext;
	const { fields } = useFieldArray({
		control,
		name: "settings",
	});

	const handleSubmit = (plugin: TPlugin) => {
		// eslint-disable-next-line no-console
		console.log(plugin);
		onSubmit(plugin);
	};

	return (
		<div className={className}>
			<FormContainer
				formContext={formContext}
				onSuccess={handleSubmit}
				onError={(e) => console.error(e)}
			>
				<ul>
					{fields.map((item, index) => (
						<BntTextInputElement
							margin="normal"
							fullWidth
							required
							key={item.id}
							name={`settings.${index}.value`}
							label={t(texts_n.name, { capitalize: true })}
							autoFocus
						/>
					))}
				</ul>

				<BntFormSubmit visible onCancelClick={onCancel} submitCaption={submitCaption} />
			</FormContainer>
		</div>
	);
};
