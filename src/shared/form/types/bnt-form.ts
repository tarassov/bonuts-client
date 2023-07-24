import { UseFormRegisterReturn } from "react-hook-form";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { Theme } from "@mui/material/styles";

export enum TFieldSize {
	xs = "xs",
	sm = "sm",
	md = "md",
	lg = "lg",
}

export type TSizeProps = {
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
};

export type TPaddingProps = {
	padding?: {
		p?: number;
		pt?: number;
		pb?: number;
		pl?: number;
		pr?: number;
	};
};

export type TOffsetProps = {
	offsetBeforeElement?: TSizeProps;
	offsetAfterElement?: TSizeProps;
};

export type TGroupStyle = {
	border?: string;
	margin?: string;
	boxShadow?: number;
};

export type TFieldGroup = {
	id: number;
	gap?: number;
	groups?: Array<TFieldGroup>;
	offset?: TOffsetProps;
	sx?: (theme: Theme) => SystemStyleObject<Theme>;
} & TSizeProps &
	TPaddingProps;

export enum TFieldType {
	password = "password",
	tags = "tags",
	imageUpload = "imageUpload",
	text = "text",
	number = "number",
	textarea = "textarea",
	date = "date",
	switch = "switch",
}
export type TFormImageValue = {
	url: string;
	thumb: { url: string };
	preview: { url: string };
};
export type TFormPrimitiveValue = string | number | boolean | null;
export type TFormValueArray = Array<TFormPrimitiveValue>;
export type TFormValue =
	| TFormPrimitiveValue
	| TFormValueArray
	| TFormImageValue
	| Array<TFormFieldSourceItem>
	| File
	| null
	| undefined;
export type TFormFieldSourceItem = { key: string | number; label?: string };
export type TFormFieldSource = Array<TFormFieldSourceItem>;
export type TFormField<T = Record<string, any>> = TSizeProps & {
	name: keyof T;
	label: string;
	size: TFieldSize;
	offset?: TOffsetProps;
	source?: TFormFieldSource;
	disabled?: boolean;
	image: boolean;
	placeholder?: string;
	type?: TFieldType;
	rows?: number;
	maxRows?: number;
	minRows?: number;
	required?: boolean;
	loading?: boolean;
	valueToOption?: (
		value: any
	) => string | number | Array<string | number> | Array<TFormFieldSourceItem>;
	optionToValue?: (value: TFormFieldSourceItem) => any;
	group?: number;
	onClick?: (value: TFormValue) => void;
};

export type RegisterFunc = (
	name: string,
	options?: { required: boolean }
) => UseFormRegisterReturn<any>;

export type TFormProps<T extends Record<string, any>> = {
	hasInitial?: boolean;
	initialValues?: T;
	formId: string;
	fields?: Array<TFormField<any>>;
	groups?: Array<TFieldGroup>;
	groupGap?: number;
	submitCaption?: string;
	onLoad?: () => void;
	onSubmit?: (values: T) => Promise<{ data?: any; error?: any } | undefined> | undefined | void;
	onValidate?: (values: Array<Record<string, any>>) => boolean;
	children?: JSX.Element | JSX.Element[];
	locale?: Locale;
};
