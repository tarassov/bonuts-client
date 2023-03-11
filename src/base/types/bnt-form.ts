export enum TFieldSize {
	xs = "xs",
	sm = "sm",
	md = "md",
	lg = "lg",
}

export enum TFieldType {
	password = "password",
}
export type TFormFieldSource = Array<any>;
export type TFormField = {
	name: string;
	label: string;
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	size: TFieldSize;
	source?: TFormFieldSource;
	disabled: boolean;
	image: boolean;
	placeholder?: string;
	type?: TFieldType;
	rows?: number;
	required?: boolean;
};
export type TFormProps = {
	hasInitial?: boolean;
	initialValues?: Record<string, any> | null;
	formId: string;
	fields: Array<TFormField>;
	submitCaption?: string;
	onLoad?: () => void;
	onSubmit?: (values: Record<string, any>) => void;
	onValidate?: (values: Array<Record<string, any>>) => boolean;
};
