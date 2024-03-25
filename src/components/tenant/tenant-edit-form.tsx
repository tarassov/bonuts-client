import { BntForm } from "shared/form/bnt-form";
import { useTenantLoader } from "logic/hooks/tenant/use-tenant-loader";
import { useTenantFormFields } from "components/tenant/hooks/use-tenant-form-fields";
import { useUpdateCurrentTenant } from "logic/hooks/tenant/use-update-current-tenant";
import { TTenant } from "@/types/model/tenant";

export const TenantEditForm = () => {
	const { tenant } = useTenantLoader();
	const { updateTenant } = useUpdateCurrentTenant();
	const fieldsProps = useTenantFormFields();

	const handleSubmit = (values: TTenant) => {
		return updateTenant(values);
	};

	return (
		<BntForm
			formId="current_tenant"
			hasInitial
			initialValues={tenant}
			{...fieldsProps}
			onSubmit={handleSubmit}
		/>
	);
};
