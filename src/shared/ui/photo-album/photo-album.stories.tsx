import { useState } from "react";
import { Box, Stack } from "@mui/material";

import { BntButton } from "@/shared/ui/buttons";

import { PhotoAlbumGrid, PhotoAlbumViewer, type TPhotoAlbumItem } from "./index";

const photoItems: Array<TPhotoAlbumItem> = [
	{
		id: 1,
		userId: 101,
		previewUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
		originalUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80",
	},
	{
		id: 2,
		userId: 202,
		previewUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
		originalUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=80",
	},
	{
		id: 3,
		userId: 101,
		previewUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
		originalUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80",
	},
];

function PhotoAlbumViewerStory() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Stack spacing={2} sx={{ width: "min(960px, 100%)" }}>
			<BntButton noTransform variant="outlined" onClick={() => setIsOpen(true)}>
				Open album viewer
			</BntButton>
			{isOpen ? (
				<PhotoAlbumViewer closeLabel="Close" nextLabel="Next" onClose={() => setIsOpen(false)} photoLabel="Photos" photos={photoItems} previousLabel="Previous" title="Recognition album" />
			) : null}
		</Stack>
	);
}

const meta = {
	title: "Shared/UI/Photo Album",
	parameters: {
		layout: "padded",
	},
};

export default meta;

export const Grid = {
	render: () => (
		<Box sx={{ width: "min(860px, 100%)" }}>
			<PhotoAlbumGrid emptyText="No photos yet" onPhotoClick={() => undefined} photoLabel="Photos" photos={photoItems} />
		</Box>
	),
};

export const Empty = {
	render: () => (
		<Box sx={{ width: "min(860px, 100%)" }}>
			<PhotoAlbumGrid emptyText="No photos yet" onPhotoClick={() => undefined} photoLabel="Photos" photos={[]} />
		</Box>
	),
};

export const Viewer = {
	render: () => <PhotoAlbumViewerStory />,
};
