import { Avatar, Box, Button } from "@mui/material";
import { FC } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useTranslation } from "react-i18next";
import { Dictionary } from "../../constants/dictionary";
import { LogoutOutlined } from "@mui/icons-material";

const LogOutPage: FC = () => {
	const { auth, signOut } = useAuth();
	const { t } = useTranslation();
	const onClick = () => {
		signOut();
	};
	return (
		<Box
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
		</Box>
	);
};

export default LogOutPage;
