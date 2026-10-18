/** biome-ignore-all lint/correctness/noUndeclaredVariables: Cypress helper */

import { TENANT_RESPONSE } from "./fixtures/tenant-response";

const POST_HEARTBEAT_URL = /\/user_activity\/heartbeat(?:\?.*)?$/;
const GET_CURRENT_TENANT_URL = /\/tenant\/current(?:\?.*)?$/;

export function mockHeartbeatRequest() {
	cy.intercept("POST", POST_HEARTBEAT_URL, { body: {}, statusCode: 200 }).as("postHeartbeat");
}

/** The app shell requests the current tenant on every authorized page (feature flags for the admin AI chat entry point). */
export function mockCurrentTenantRequest() {
	cy.intercept("GET", GET_CURRENT_TENANT_URL, { body: TENANT_RESPONSE, statusCode: 200 }).as("getCurrentTenant");
}
