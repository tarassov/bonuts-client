import { BntForm } from "shared/form/bnt-form";
import { useTenantLoader } from "logic/hooks/tenant/use-tenant-loader";
import { useTenantFormFields } from "components/tenant/hooks/use-tenant-form-fields";
import { emptyFunction } from "utils/empty-function";

export const TenantEditForm = () => {
	const { tenant } = useTenantLoader();
	const fieldsProps = useTenantFormFields();
	return (
		<BntForm
			formId="current_tenant"
			hasInitial
			initialValues={tenant}
			{...fieldsProps}
			onSubmit={emptyFunction}
		/>
	);
};
