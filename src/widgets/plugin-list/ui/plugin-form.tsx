import { ChangeEvent, FC, useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FormContainer } from "react-hook-form-mui";
import { FormControlLabel, FormGroup } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_d } from "services/localization/texts";
import { emptyFunction } from "utils/empty-function";

import { BntCard } from "@/shared/ui/card";
import { UiCheckbox } from "@/shared/ui/checkbox";
import { BntFormSubmit } from "@/shared/ui/form";
import { BntTextInputElement } from "@/shared/ui/input";

import { PluginHeader } from "./plugin-header";
import { TPlugin } from "@/types/model";

export const PluginForm: FC<{
	plugin: TPlugin;
	submitCaption?: string;
	className?: string;

	onSubmit?: (plugin: TPlugin) => Promise<void>;
	onCancel?: VoidFunction;
	onSetActive?: (id: number, active: boolean) => void;
}> = ({ onSubmit = emptyFunction, onCancel = emptyFunction, plugin, submitCaption, className, onSetActive = emptyFunction }) => {
	const { t } = useBntTranslate();
	const formContext = useForm({
		defaultValues: plugin,
	});
	const {
		control,
		formState: { isDirty },
		reset,
	} = formContext;
	const { fields } = useFieldArray({
		control,
		name: "settings",
	});

	const handleSubmit = async (value: TPlugin) => {
		await onSubmit(value);
		reset(value);
	};

	const handleCheck = useCallback(
		(event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
			onSetActive(plugin.id, checked);
		},
		[onSetActive, plugin]
	);

	return (
		<BntCard className={className} sx={{ paddingTop: 2, paddingLeft: 2 }}>
			<PluginHeader plugin={plugin} />
			{plugin.active ? (
				<FormContainer formContext={formContext} onSuccess={handleSubmit} onError={(e) => console.error(e)}>
					{fields.map((item, index) => (
						<BntTextInputElement margin="normal" fullWidth required key={item.id} name={`settings.${index}.value`} label={item.name} autoFocus />
					))}

					{isDirty ? <BntFormSubmit visible onCancelClick={onCancel} submitCaption={submitCaption} /> : null}
				</FormContainer>
			) : null}
			<FormGroup>
				<FormControlLabel labelPlacement="end" control={<UiCheckbox onChange={handleCheck} checked={plugin.active} />} label={plugin.active ? t(texts_d.deactivate) : t(texts_a.activate)} />
			</FormGroup>
		</BntCard>
	);
};
