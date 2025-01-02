import { TWizardConfig } from "shared/ui/types/wizard-types";
import { ShareAllStepOne } from "components/share-all/share-all-step-one";
import { ShareAllStepTwo } from "components/share-all/share-all-step-two";
import { Wizard } from "shared/ui/wizard/wizard";
import { useTransfer } from "logic/hooks/operation/use-transfer";
import { Currency } from "constants/currency";
import { TProfile } from "@/types/model";

type ShareAllWizardType = {
	Step1: { profiles: Array<TProfile> };
	Step2: { amount: number; comment: string; type: Currency };
};

export const ShareAllWizard = () => {
	const { adminDeposit } = useTransfer();

	const onSubmit = async (values: Partial<ShareAllWizardType & { onSuccess?: VoidFunction }>) => {
		const { Step1, Step2, onSuccess } = values;
		if (Step1 && Step2) {
			const { profiles } = Step1;
			const { amount, comment, type } = Step2;
			adminDeposit(
				{ amount, comment, toSelfAccount: type === Currency.coin, ids: profiles.map((x) => x.id) },
				{ onSuccess }
			);
		}
	};
	const shareAllConfig: TWizardConfig<ShareAllWizardType, undefined> = {
		initialValues: undefined,
		onSubmit,
		steps: {
			Step1: {
				renderItem: (args) => (
					<ShareAllStepOne next={args.next} initialProfiles={args.wizardState.Step1?.profiles} />
				),
			},
			Step2: {
				renderItem: (args) => (
					<ShareAllStepTwo
						profiles={args.wizardState.Step1?.profiles}
						back={args.back}
						next={args.next}
					/>
				),
			},
		},
	};

	return <Wizard config={shareAllConfig} />;
};
