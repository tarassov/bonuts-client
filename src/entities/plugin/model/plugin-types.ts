export interface IPluginApi {
	isConnected(): boolean;
	connect(): Promise<unknown>;
	onConnectChange(callback: (connected: boolean) => void): void;
	disconnect?: () => Promise<unknown>;
}

export type TPluginState = {
	register(name: string, api: IPluginApi): void;
	getPluginApi(name: string): IPluginApi | undefined;
};
