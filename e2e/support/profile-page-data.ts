export const CIRCLES_RESPONSE = {
	data: [
		{
			id: "1",
			type: "circles",
			attributes: {
				id: 1,
				name: "Avengers",
				active: true,
			},
		},
		{
			id: "2",
			type: "circles",
			attributes: {
				id: 2,
				name: "R&D",
				active: true,
			},
		},
	],
};

export const PROFILE_PICTURES_RESPONSE = {
	data: [
		{
			id: 11,
			caption: null,
			profile_id: 1,
			user_id: 101,
			image: {
				url: "https://example.com/photos/tony-1.jpg",
				thumb: { url: "https://example.com/photos/tony-1-thumb.jpg" },
				preview: { url: "https://example.com/photos/tony-1-preview.jpg" },
			},
			likes_count: 0,
			comments_count: 0,
			liked: false,
			comments: [],
			created_at: "2026-01-01T00:00:00.000Z",
			updated_at: "2026-01-01T00:00:00.000Z",
		},
		{
			id: 12,
			caption: null,
			profile_id: 1,
			user_id: 202,
			image: {
				url: "https://example.com/photos/pepper-1.jpg",
				thumb: { url: "https://example.com/photos/pepper-1-thumb.jpg" },
				preview: { url: "https://example.com/photos/pepper-1-preview.jpg" },
			},
			likes_count: 0,
			comments_count: 0,
			liked: false,
			comments: [],
			created_at: "2026-01-02T00:00:00.000Z",
			updated_at: "2026-01-02T00:00:00.000Z",
		},
	],
};
