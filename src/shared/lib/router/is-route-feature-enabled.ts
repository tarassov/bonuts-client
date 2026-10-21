/** A route without a feature flag is always available; a flagged one only while its flag is enabled for the tenant. */
export const isRouteFeatureEnabled = <T>(route: TRoute<T>, featureFlags: Array<string>): boolean => !route.featureFlag || featureFlags.includes(route.featureFlag);
