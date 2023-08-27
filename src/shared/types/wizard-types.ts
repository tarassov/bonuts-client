import { ReactNode } from "react";
import { VoidResponseFunction } from "@/types/function-types";

export type TStepState = { prev?: any; next: any };

export type TWizardProps<TWizardState, TNextProps, TInitialValues> = {
	wizardState: Partial<TWizardState>;
	initialValues?: TInitialValues;
	next?: VoidResponseFunction<TNextProps>;
	back?: VoidFunction;
};

export type TWizardStep<TWizardState, TNextProps, TInitialValues> = {
	renderItem: (
		props: TWizardProps<TWizardState, TNextProps, TInitialValues>
	) => ReactNode | Array<ReactNode>;
	title?: string | ((data: TWizardState) => string);
};

type TWizardSteps<TWizardState, TInitialValues> = {
	[name in keyof TWizardState]: Pick<
		TWizardStep<TWizardState, TWizardState[name], TInitialValues>,
		"renderItem" | "title"
	>;
};

/*
 *  wizard config type, where T is
 * */
export type TWizardConfig<TWizardState, TInitialValues> = {
	steps: TWizardSteps<TWizardState, TInitialValues>;
	initialValues: TInitialValues;
	onSubmit: VoidResponseFunction<Partial<TWizardState> & { onSuccess?: VoidFunction }>;
};
