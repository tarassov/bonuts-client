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
	{
		id: 4,
		userId: 303,
		previewUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
		originalUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80",
	},
	{
		id: 5,
		userId: 202,
		previewUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
		originalUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
	},
	{
		id: 6,
		userId: 303,
		previewUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
		originalUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
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

export const Loading = {
	render: () => (
		<Box sx={{ width: "min(860px, 100%)" }}>
			<PhotoAlbumGrid emptyText="No photos yet" isLoading onPhotoClick={() => undefined} photoLabel="Photos" photos={[]} />
		</Box>
	),
};

export const Viewer = {
	render: () => <PhotoAlbumViewerStory />,
};
