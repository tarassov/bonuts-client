import { Avatar, Button } from "@mui/material";
import { BntBox } from "shared/box/bnt-box";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { LogoutOutlined } from "@mui/icons-material";
import { useAuth } from "logic/hooks/auth/use-auth";
import { Dictionary } from "constants/dictionary";

export const LogoutPage: FC = () => {
	const { signOut } = useAuth();
	const { t } = useTranslation();
	const onClick = () => {
		signOut();
	};
	return (
		<BntBox
			sx={{
				mt: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{
					mt: 3,
					mb: 2,
					width: "250px",
					display: "flex",
					justifyContent: "space-evenly",
				}}
				onClick={onClick}
			>
				{t(Dictionary.SIGN_OUT)}
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LogoutOutlined />
				</Avatar>
			</Button>
		</BntBox>
	);
};
