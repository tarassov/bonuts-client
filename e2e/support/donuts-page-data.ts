import { PROFILE_RESPONSE } from "./fixtures/profile-response";

export const DONUTS_PROFILE_RESPONSE = {
	...PROFILE_RESPONSE,
	data: {
		...PROFILE_RESPONSE.data,
		attributes: {
			...PROFILE_RESPONSE.data.attributes,
			self_account: { id: 10, profile_id: 1 },
		},
	},
};

export const SELF_ACCOUNT_RESPONSE = {
	data: {
		attributes: { balance: 100, id: 10, type: "self" },
		id: "10",
		type: "accounts",
	},
};

export const DONUTS_RESPONSE = {
	data: [
		{
			active: true,
			available: true,
			description: "Wear the team colors.",
			expiration_date: null,
			id: 1,
			logo: null,
			name: "Hoodie Bonuts",
			on_stock: null,
			price: 120,
			use_remains: false,
		},
		{
			active: true,
			available: true,
			description: "Enjoy a coffee break.",
			expiration_date: null,
			id: 2,
			logo: null,
			name: "Coffee voucher",
			on_stock: 4,
			price: 80,
			use_remains: true,
		},
		{
			active: true,
			available: false,
			description: "null",
			expiration_date: null,
			id: 3,
			logo: null,
			name: "Team mug",
			on_stock: 0,
			price: 40,
			use_remains: true,
		},
		{
			active: true,
			available: true,
			description: "Malformed API reward without a name.",
			expiration_date: null,
			id: 4,
			logo: null,
			on_stock: 1,
			price: 10,
			use_remains: true,
		},
	],
};
