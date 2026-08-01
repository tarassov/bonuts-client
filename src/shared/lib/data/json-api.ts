/**
 * Flattens a JSON:API resource by merging its `attributes` into the resource.
 * Presenters can then consume both conventional and flattened API responses consistently.
 *
 * @example
 * unwrapJsonApiAttributes({ id: "7", attributes: { title: "Thanks" } });
 * // { id: "7", attributes: { title: "Thanks" }, title: "Thanks" }
 */
export const unwrapJsonApiAttributes = <T extends Record<string, unknown>>(resource: T): T => {
	const attributes = resource.attributes;

	return attributes && typeof attributes === "object" ? { ...resource, ...(attributes as T) } : resource;
};
