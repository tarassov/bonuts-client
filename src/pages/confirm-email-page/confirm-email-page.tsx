import { Button } from "@mui/material";
import { BntBox } from "shared/ui/box/bnt-box";
import { FC } from "react";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c, texts_e, texts_n } from "services/localization/texts";

import BonutsFullIcon from "icons/BonutsFullIcon.svg";

import { useConfirmEmail } from "logic/hooks/auth/use-confirm-email";
import { useParams } from "react-router-dom";
import { BntTypography } from "shared/ui/typography/typography";
import { useProjectNavigate } from "hooks/use-project-navigate";
import styles from "./confirm-email-page.module.scss";

export const ConfirmEmailPage: FC = () => {
	const { token } = useParams();
	const { user, confirm, isLoading } = useConfirmEmail(token);
	const { navigateToLogin } = useProjectNavigate();
	const { translate } = useBntTranslate();

	useLoader(Modules.ConfirmEmail, isLoading);

	return (
		<BntBox className={styles.box} sx={{ mt: 8 }}>
			<BonutsFullIcon style={{ width: "110px", height: "50px" }} />
			{user?.attributes?.email ? (
				<>
					<BntTypography>{`${translate(texts_e.email_confirmation, { capitalize: true })}:  ${
						user.attributes.email
					}`}</BntTypography>
					<Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={confirm}>
						{translate(texts_c.confirm)}
					</Button>
				</>
			) : (
				<>
					<BntTypography>{translate(texts_n.not_found, { capitalize: true })}</BntTypography>
					<Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={navigateToLogin}>
						{translate(texts_c.close)}
					</Button>
				</>
			)}
		</BntBox>
	);
};
