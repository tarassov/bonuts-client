import React, { useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	TextField,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { usePostAvatarsMutation } from "../../services/api/form-data-api";
import { extendedApi } from "../../services/api/extended-api";

const ProfilePage: React.FC = () => {
	const [postAvatars] = usePostAvatarsMutation();

	const [file, setFile] = useState<File | undefined>();
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			const file = e.target.files[0];

			reader.onloadend = () => {
				setFile(file);
				setImagePreviewUrl(reader.result as string);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const reader = new FileReader();
			const file = e.dataTransfer.files[0];

			reader.onloadend = () => {
				setFile(file);
				setImagePreviewUrl(reader.result as string);
			};

			reader.readAsDataURL(file);
		}
	};

	const submit = (e: any) => {
		e.preventDefault();
		console.log(file);
		const formPayLoad = new FormData();
		file && formPayLoad.append("uploaded_image", file);
		formPayLoad.append("tenant", "demo");
		formPayLoad.append("id", "1");
		postAvatars(formPayLoad);
	};

	return (
		<Card
			sx={{
				maxWidth: 500,
				margin: "10",
			}}
		>
			<CardContent>
				<form onSubmit={submit}>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						id="title"
						label="Title"
						name="title"
					/>
					{imagePreviewUrl ? (
						<CardMedia
							sx={{
								height: 0,
								paddingTop: "56.25%", // 16:9
							}}
							image={imagePreviewUrl}
							title="Selected Image"
						/>
					) : (
						<Box
							sx={{
								border: "dashed 2px #aaa",
								borderRadius: 5,
								cursor: "pointer",
								padding: "1em",
								textAlign: "center",
							}}
							onDragOver={handleDragOver}
							onDrop={handleDrop}
						>
							<p>Drag and drop an image here or click to select a file</p>
							<input
								accept="image/*"
								style={{ display: "none" }}
								id="raised-button-file"
								name="uploaded_file"
								multiple
								type="file"
								onChange={handleFileInputChange}
							/>
							<label htmlFor="raised-button-file">
								<Button
									variant="contained"
									color="primary"
									component="span"
									startIcon={<CloudUpload />}
								>
									Upload Image
								</Button>
							</label>
						</Box>
					)}
					<Button variant="contained" color="primary" type="submit">
						Save
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default ProfilePage;
