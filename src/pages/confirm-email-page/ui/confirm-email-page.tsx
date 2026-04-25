import { FC } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useProjectNavigate } from "hooks/use-project-navigate";
import { texts_c, texts_e, texts_n } from "services/localization/texts";

import { BntBox } from "@/shared/ui/box";
import { BonutsFullIcon } from "@/shared/ui/icons";
import { useLoader } from "@/shared/ui/loader";
import { BntTypography } from "@/shared/ui/typography";

import styles from "./confirm-email-page.module.scss";
import { useConfirmEmail } from "logic/hooks/auth/use-confirm-email";

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
					<BntTypography>{`${translate(texts_e.email_confirmation, { capitalize: true })}:  ${user.attributes.email}`}</BntTypography>
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
