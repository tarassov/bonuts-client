import { BntForm } from "@/shared/ui/form";

import styles from "./tenant-settings-form.module.scss";
import { useTenantSettingsFormFields } from "./use-tenant-settings-form-fields";
import { useTenantSettingsFormGroups } from "./use-tenant-settings-form-groups";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useTenantLoader } from "@/logic/hooks/tenant/use-tenant-loader";
import { useUpdateCurrentTenant } from "@/logic/hooks/tenant/use-update-current-tenant";
import { texts_s } from "@/services/localization/texts";
import type { TTenant } from "@/types/model/tenant";

export function TenantSettingsForm() {
	const { tenant } = useTenantLoader();
	const { updateTenant } = useUpdateCurrentTenant();
	const { fields } = useTenantSettingsFormFields();
	const { groups } = useTenantSettingsFormGroups();
	const { t } = useBntTranslate();

	const handleSubmit = (values: TTenant) => {
		return updateTenant(values);
	};

	return (
		<div className={styles.form}>
			<BntForm
				fields={fields}
				formId="current_tenant"
				groupGap={3}
				groups={groups}
				hasInitial
				initialValues={tenant}
				isSubmitAlwaysVisible
				onSubmit={handleSubmit}
				submitCaption={t(texts_s.save, { capitalize: true })}
			/>
		</div>
	);
}
