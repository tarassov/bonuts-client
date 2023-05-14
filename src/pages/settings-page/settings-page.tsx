import { FC } from "react";
import { ChildPathMenu } from "components/child-path";
import { settingsRoute } from "routes/routes";

export const SettingsPage: FC = () => {
	return <ChildPathMenu route={settingsRoute} />;
};
