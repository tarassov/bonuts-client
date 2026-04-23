import { useEffect, useMemo, useState } from "react";
import { FormContainer } from "react-hook-form-mui";

import _ from "lodash";

import { Modules } from "constants/modules";
import { useDateLocale } from "shared/ui/locale/hooks/use-date-locale";

import { useLoader } from "@/shared/ui/loader";

import { useProfileFormFields } from "../model/use-profile-form-fields";
import type { TUpdateProfileValues } from "../model/use-update-profile";

import { ProfileFormLayout } from "./profile-form-layout";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { DateFnsProvider } from "react-hook-form-mui/dist/date-fns";
import type { TProfile } from "@/types/model";

interface IProfileFormProps {
	profile?: TProfile;
	isLoading?: boolean;
	error?: FetchBaseQueryError | SerializedError;

	updateProfile: (profile: TProfile, values: TUpdateProfileValues) => Promise<{ data?: unknown; error?: unknown } | undefined>;
}

export function BntProfileForm({ profile, isLoading = false, error, updateProfile }: IProfileFormProps) {
	const { fields } = useProfileFormFields();
	const locale = useDateLocale();
	const [values, setValues] = useState<Record<string, any>>({});
	const [formError, setFormError] = useState<string>();
	const [initials, setInitials] = useState<Record<string, any> | undefined>(undefined);
	const formId = "user-profile";

	useLoader(Modules.Profile, isLoading && !error);

	const transformedInitials = useMemo(() => {
		if (!profile) return;

		return _.mapValues(profile, (value, key) => {
			const field = fields.find((item) => item.name === key);
			if (field?.valueToOption) {
				return field.valueToOption(value);
			}
			return value;
		});
	}, [profile, fields]);

	useEffect(() => {
		if (!transformedInitials) return;

		setValues((prev) => (_.isEmpty(prev) ? transformedInitials : prev));
		setInitials(transformedInitials);
	}, [transformedInitials]);

	const handleError = (message?: string) => {
		setFormError(message);
	};

	const onSubmit = async (submitValues: TProfile) => {
		const transformedValues = Object.entries(submitValues).reduce((acc, [key, value]) => {
			const field = fields.find((item) => item.name === key);

			if (field?.optionToValue) {
				const newValue = _.isArray(value) ? value.map((item) => field.optionToValue?.(item as any)) : field.optionToValue(value as any);
				return { ...acc, [key]: newValue };
			}

			return { ...acc, [key]: value };
		}, submitValues);

		if (formError) setFormError(undefined);

		const response = profile ? await updateProfile(profile, { ...transformedValues, active: true }) : undefined;

		if (response && !(response as any).error) {
			setInitials(submitValues as Record<string, any>);
		}

		if ((response as any)?.error) {
			handleError((response as any)?.error || "saving error");
			throw new Error("saving error");
		}
	};

	if (!initials) return null;

	return (
		<DateFnsProvider adapterLocale={locale}>
			<FormContainer defaultValues={initials} onSuccess={onSubmit}>
				<ProfileFormLayout fields={fields} formId={formId} initialValues={initials} values={values} onDiscard={() => setValues(initials || {})} error={formError} />
			</FormContainer>
		</DateFnsProvider>
	);
}
