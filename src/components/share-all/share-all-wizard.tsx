import { TWizardConfig } from "shared/types/wizard-types";
import { ShareAllStepOne } from "components/share-all/share-all-step-one";
import { ShareAllStepTwo } from "components/share-all/share-all-step-two";
import { Wizard } from "shared/wizard/wizard";
import { TProfile } from "@/types/model";

type ShareAllWizardType = {
	Step1: { profiles: Array<TProfile> };
	Step2: { amount: number; comment: string };
};

export const ShareAllWizard = () => {
	const shareAllConfig: TWizardConfig<ShareAllWizardType, undefined> = {
		initialValues: undefined,
		onSubmit: (args) => console.warn(args),
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
