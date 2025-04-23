import { useState } from "react";
import { TWizardConfig, TWizardProps } from "shared/ui/types/wizard-types";
import { BntBox } from "shared/ui/box/bnt-box";

export const Wizard = <TConfig, TInitialProps>(props: {
	config: TWizardConfig<TConfig, TInitialProps>;
}) => {
	const { config } = props;
	const { steps, initialValues, onSubmit } = config;

	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const currentStepName = Object.keys(steps)[currentStepIndex];

	const [wizardState, setWizardState] = useState<Partial<TConfig>>({});
	const currentStep = steps[currentStepName as keyof TConfig];

	const resetWizard = () => {
		setCurrentStepIndex(0);
		setWizardState({});
	};

	const stepProps: TWizardProps<TConfig, TConfig[keyof TConfig], TInitialProps> = {
		wizardState,
		initialValues,
		back: () => {
			if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1);
		},
		next: (args) => {
			setWizardState((prev) => {
				return { ...prev, [currentStepName]: args };
			});
			if (currentStepIndex < Object.keys(steps).length - 1) {
				setCurrentStepIndex((prev) => prev + 1);
			} else {
				onSubmit({ ...wizardState, [currentStepName]: args, onSuccess: resetWizard });
			}
		},
	};
	return <BntBox>{currentStep.renderItem(stepProps)}</BntBox>;
};
