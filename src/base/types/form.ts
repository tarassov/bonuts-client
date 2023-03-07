export enum TFieldSize {
	xs = "xs",
	sm = "sm",
	md = "md",
	lg = "lg",
	bg = "bg",
}
export type TFormFieldSource = Array<any>;
export type TFormField = {
	name: string;
	label: string;
	xs?: number;
	lg?: number;
	bg?: number;
	md?: number;
	size: TFieldSize;
	source: TFormFieldSource;
	disabled: boolean;
	image: boolean;
};
export type TFormProps = {
	hasInitial?: boolean;
	formId: string;
	fields: Array<TFormField>;
	submitCaption?: string;
	onLoad?: () => void;
	onSubmit?: (values: Array<Record<string, any>>) => void;
	onValidate?: (values: Array<Record<string, any>>) => boolean;
};
