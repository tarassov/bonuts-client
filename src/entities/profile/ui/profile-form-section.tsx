import { BntCard } from "@/shared/ui/card/card";
import { TFormField } from "@/shared/ui/form/types/bnt-form";
import { BntTypography } from "@/shared/ui/typography";

import { ProfileFieldList } from "./profile-field-list";
import s from "./profile-form.module.scss";
import type { TProfile } from "@/types/model";

export function ProfileFormSection({ title, hint, fields, formId, emphasized = false }: { title: string; hint?: string; fields: Array<TFormField<TProfile>>; formId: string; emphasized?: boolean }) {
	return (
		<BntCard className={`${s.sectionCard} ${emphasized ? s.bioCard : ""}`}>
			<div className={s.sectionHeader}>
				<BntTypography variant="h6" className={s.sectionTitle}>
					{title}
				</BntTypography>
				{hint ? (
					<BntTypography variant="body2" color="text.secondary" className={s.sectionHint}>
						{hint}
					</BntTypography>
				) : null}
			</div>
			<div className={s.fieldsQuiet}>
				<ProfileFieldList fields={fields} formId={formId} />
			</div>
		</BntCard>
	);
}
