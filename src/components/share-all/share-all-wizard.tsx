import { TWizardConfig } from "shared/types/wizard-types";
import { ShareAllStepOne } from "components/share-all/share-all-step-one";
import { ShareAllStepTwo } from "components/share-all/share-all-step-two";
import { Wizard } from "shared/wizard/wizard";
import { useTransfer } from "logic/hooks/operation/use-transfer";
import { TProfile } from "@/types/model";

type ShareAllWizardType = {
	Step1: { profiles: Array<TProfile> };
	Step2: { amount: number; comment: string; toSelfAccount: boolean };
};

export const ShareAllWizard = () => {
	const { adminDeposit } = useTransfer();

	const onSubmit = (values: Partial<ShareAllWizardType>) => {
		const { Step1, Step2 } = values;
		if (Step1 && Step2) {
			const { profiles } = Step1;
			const { amount, comment, toSelfAccount } = Step2;
			adminDeposit({ amount, comment, toSelfAccount, ids: profiles.map((x) => x.id) });
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
