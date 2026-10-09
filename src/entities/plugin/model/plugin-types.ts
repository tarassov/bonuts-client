export interface IPluginApi {
	isConnected(): boolean;
	connect(): Promise<unknown>;
	onConnectChange(callback: (connected: boolean) => void): void;
	getDisabledState?: () => {
		disabled: boolean;
		reason?: React.ReactNode;
	};
	disconnect?: () => Promise<unknown>;
	icon?: React.ReactNode;
	hideName?: boolean;
}

export type TPluginState = {
	register(name: string, api: IPluginApi): void;
	getPluginApi(name: string): IPluginApi | undefined;
};
