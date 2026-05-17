export type BooleanVoidFunction = (arg: boolean) => void;

export type VoidResponseFunction<TInputArgs> = (args: TInputArgs) => void;

export type GenericFunction<TInputArgs, TOutputArgs> = (args: TInputArgs) => TOutputArgs;
