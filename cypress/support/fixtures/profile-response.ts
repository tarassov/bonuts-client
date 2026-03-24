export const PROFILE_RESPONSE = {
	data: {
		id: "1",
		type: "profiles",
		attributes: {
			id: 1,
			user_id: 101,
			active: true,
			admin: true,
			store_admin: true,
			roles: ["admin", "store_admin"],
			circles: [
				{
					id: 1,
					name: "Avengers",
					active: true,
				},
			],
			first_name: "Tony",
			last_name: "Stark",
			name: "Tony Stark",
			position: "Iron Man",
			email: "tony.stark@example.com",
			contact: "@ironman",
			bio: "Genius, billionaire, philanthropist.",
			birthdate: "2020-01-01",
			in_date: "2021-02-03",
			tenant: "test-tenant",
			user_avatar: {
				url: null,
				thumb: { url: null },
				preview: { url: null },
			},
		},
	},
};
