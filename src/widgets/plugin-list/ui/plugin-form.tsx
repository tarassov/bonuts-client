import { ChangeEvent, FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FormContainer } from "react-hook-form-mui";

import { BntCard } from "shared/ui/card/card";
import { UiCheckbox } from "shared/ui/checkbox";
import { BntFormSubmit } from "shared/ui/form/bnt-form-submit";
import { BntTextInputElement } from "shared/ui/input/text-input-element";

import { emptyFunction } from "utils/empty-function";

import { TPlugin } from "@/types/model";
import { PluginHeader } from "@/widgets/plugin-list/ui/plugin-header";

export const PluginForm: FC<{
	plugin: TPlugin;
	submitCaption?: string;
	className?: string;

	onSubmit?: (plugin: TPlugin) => void;
	onCancel?: VoidFunction;
	onSetActive?: (active: boolean) => void;
}> = ({
	onSubmit = emptyFunction,
	onCancel = emptyFunction,
	plugin,
	submitCaption,
	className,
	onSetActive = emptyFunction,
}) => {
	const formContext = useForm({
		defaultValues: plugin,
	});
	const { control } = formContext;
	const { fields } = useFieldArray({
		control,
		name: "settings",
	});

	const handleSubmit = (value: TPlugin) => {
		onSubmit(value);
	};

	const handleCheck = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
		onSetActive(checked);
	};

	return (
		<BntCard className={className} sx={{ paddingTop: 2, paddingLeft: 2 }}>
			<PluginHeader plugin={plugin} />
			{plugin.active ? (
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
			) : (
				<UiCheckbox onChange={handleCheck} />
			)}
		</BntCard>
	);
};
