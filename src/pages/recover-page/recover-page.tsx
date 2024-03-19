import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "pages/registration-page/registration-page.module.scss";
import { PasswordRecoverRequest } from "components/password-recover/password-recover-request";
import { PasswordRecoverSet } from "components/password-recover/password-recover-set";
import { usePasswordRecover } from "logic/hooks/auth/use-password-recover";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useProjectNavigate } from "hooks/use-project-navigate";
import { BntBox } from "shared/box/bnt-box";

export const RecoverPage: FC = () => {
	const { token } = useParams();
	const { sendRecoverEmail, changePassword, isLoading, isError } = usePasswordRecover(token);
	const { navigateToLogin } = useProjectNavigate();

	useEffect(() => {
		if (isError) navigateToLogin();
	}, [isError]);

	useLoader(Modules.Default, isLoading);

	return (
		<BntBox className={styles.box} sx={{ mt: 8 }}>
			{!token ? (
				<PasswordRecoverRequest onSubmit={sendRecoverEmail} />
			) : (
				<PasswordRecoverSet onSubmit={changePassword} />
			)}
		</BntBox>
	);
};
