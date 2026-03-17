const tenant = "acme";

const profileResponse = {
	data: {
		id: "101",
		attributes: {
			email: "jane.doe@example.com",
			first_name: "Jane",
			last_name: "Doe",
			contact: "@janedoe",
			position: "Engineer",
			roles: ["admin"],
			tenant,
			circles: [],
			birthdate: null,
			in_date: null,
			bio: "Bio",
			active: true,
		},
	},
};

describe("Profile page settings", () => {
	beforeEach(() => {
		cy.intercept("GET", "**/profile*", profileResponse).as("getProfile");
		cy.intercept("GET", "**/circles*", { data: [] }).as("getCircles");
	});

	it("renders profile settings fields", () => {
		cy.visit("/my", {
			onBeforeLoad: (win) => {
				win.localStorage.setItem(
					"settings",
					JSON.stringify({ auth_token: "test-token", tenant })
				);
			},
		});

		cy.wait(["@getProfile", "@getCircles"]);
		cy.get('input[name="email"]').should("have.value", "jane.doe@example.com");
		cy.get('input[name="first_name"]').should("have.value", "Jane");
		cy.get('input[name="position"]').should("have.value", "Engineer");
		cy.get('textarea[name="bio"]').should("have.value", "Bio");
	});

	it("submits updated profile settings", () => {
		cy.intercept("PUT", "**/profiles/101", (req) => {
			expect(req.body).to.deep.include({
				position: "Lead Engineer",
				active: true,
				tenant,
			});
			req.reply({
				data: {
					id: "101",
					attributes: req.body,
				},
			});
		}).as("saveProfile");

		cy.visit("/my", {
			onBeforeLoad: (win) => {
				win.localStorage.setItem(
					"settings",
					JSON.stringify({ auth_token: "test-token", tenant })
				);
			},
		});

		cy.wait(["@getProfile", "@getCircles"]);
		cy.get('input[name="position"]').clear().type("Lead Engineer");
		cy.contains("button", "Save").click();
		cy.wait("@saveProfile");
	});

	it("opens integration settings from settings page", () => {
		cy.visit("/settings", {
			onBeforeLoad: (win) => {
				win.localStorage.setItem(
					"settings",
					JSON.stringify({ auth_token: "test-token", tenant })
				);
			},
		});

		cy.contains("Plugins").should("be.visible").click();
		cy.location("pathname").should("eq", "/plugins");
	});

	it("opens language/team settings from settings page", () => {
		cy.visit("/settings", {
			onBeforeLoad: (win) => {
				win.localStorage.setItem(
					"settings",
					JSON.stringify({ auth_token: "test-token", tenant })
				);
			},
		});

		cy.contains("Team settings").should("be.visible").click();
		cy.location("pathname").should("eq", "/tenant");
	});
});
