/**
 * Returns the browser/system IANA timezone identifier.
 */
export const getLocalTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
