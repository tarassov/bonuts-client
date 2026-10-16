/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress helper */

const POST_HEARTBEAT_URL = /\/user_activity\/heartbeat(?:\?.*)?$/;

export function mockHeartbeatRequest() {
	cy.intercept("POST", POST_HEARTBEAT_URL, { body: {}, statusCode: 200 }).as("postHeartbeat");
}
