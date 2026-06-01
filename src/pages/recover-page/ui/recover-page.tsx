import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { PasswordRecoverRequest } from "components/password-recover/password-recover-request";
import { PasswordRecoverSet } from "components/password-recover/password-recover-set";
import { Modules } from "constants/modules";
import { useProjectNavigate } from "hooks/use-project-navigate";

import { isBlank } from "@/shared/lib/type-guards";
import { BntBox } from "@/shared/ui/box";
import { useLoader } from "@/shared/ui/loader";

import { Messenger } from "@/features/3cx";

import styles from "./recover-page.module.scss";
import { usePasswordRecover } from "logic/hooks/auth/use-password-recover";

export const RecoverPage: FC = () => {
	const { token } = useParams();
	const { sendRecoverEmail, changePassword, isLoading, isError } = usePasswordRecover(token);
	const { navigateToLogin } = useProjectNavigate();

	useEffect(() => {
		if (isError) navigateToLogin();
	}, [isError, navigateToLogin]);

	useLoader(Modules.Default, isLoading);

	return (
		<>
			<BntBox className={styles.box} sx={{ mt: 8 }}>
				{isBlank(token) ? <PasswordRecoverRequest onSubmit={sendRecoverEmail} /> : <PasswordRecoverSet onSubmit={changePassword} />}
			</BntBox>
			<Messenger />
		</>
	);
};
