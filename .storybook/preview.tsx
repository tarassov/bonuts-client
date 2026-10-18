import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import type { Decorator, Preview } from "@storybook/react-vite";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

import i18n from "../src/services/localization/i18n";
import { store } from "../src/services/redux/store/store";
import { DialogCloseContext, DialogContext, DialogNamesContext } from "../src/shared/ui/dialog";
import { BntThemeProvider } from "../src/themes/theme-provider";

import "../src/app/ui/app.scss";

const MODAL_NAMES = ["AdminDepositModal", "DetailedEvent", "TransferModal", "ViewEmployee"];

type TStorybookProvidersProps = {
	children: ReactNode;
};

function StorybookProviders({ children }: TStorybookProvidersProps) {
	return (
		<Provider store={store}>
			<BntThemeProvider>
				<I18nextProvider i18n={i18n}>
					<SnackbarProvider>
						<DialogContext.Provider value={async () => undefined}>
							<DialogNamesContext.Provider value={MODAL_NAMES}>
								<DialogCloseContext.Provider value={() => undefined}>
									<CssBaseline />
									{children}
								</DialogCloseContext.Provider>
							</DialogNamesContext.Provider>
						</DialogContext.Provider>
					</SnackbarProvider>
				</I18nextProvider>
			</BntThemeProvider>
		</Provider>
	);
}

const withBonutsProviders: Decorator = (Story) => (
	<StorybookProviders>
		<Story />
	</StorybookProviders>
);

const preview: Preview = {
	decorators: [withBonutsProviders],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: {
				order: ["Shared", "Entities", "Features", "Widgets", "Pages", "App"],
			},
		},
		layout: "centered",
	},
};

export default preview;
