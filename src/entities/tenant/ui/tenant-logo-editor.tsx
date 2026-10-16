import { EditableImage } from "@/shared/ui/editable-image";

import { getTenantInitials } from "../model/get-tenant-initials";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c } from "@/services/localization/texts";
import type { TTenant } from "@/types/model/tenant";

interface ITenantLogoEditorProps {
	isLoading?: boolean;
	onChange: (file: File) => Promise<unknown> | unknown;
	tenant: TTenant;
}

export function TenantLogoEditor({ isLoading = false, onChange, tenant }: ITenantLogoEditorProps) {
	const { t } = useBntTranslate();
	const title = tenant.caption || tenant.name;

	return <EditableImage alt={title} fallback={getTenantInitials(tenant)} imageUrl={tenant.logo?.url} isLoading={isLoading} label={t(texts_c.change_logo)} onChange={onChange} />;
}
