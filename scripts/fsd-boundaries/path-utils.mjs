import path from "node:path";

/**
 * Returns a de-duplicated copy of the input array while preserving first-seen order.
 *
 * @template T
 * @param {T[]} values
 * @returns {T[]}
 */
export function uniq(values) {
	return [...new Set(values)];
}

/**
 * Normalizes a filesystem path to POSIX style by converting platform separators to "/".
 *
 * Example:
 * - Windows: "src\\widgets\\item.tsx" -> "src/widgets/item.tsx"
 * - POSIX: "src/widgets/item.tsx" -> "src/widgets/item.tsx"
 *
 * @param {string} filePath
 * @returns {string}
 */
export function toPosix(filePath) {
	return filePath.split(path.sep).join("/");
}

/**
 * Checks whether a path points to a TypeScript source file inside `src/`.
 *
 * @param {string} filePath
 * @returns {boolean}
 */
export function isTsSource(filePath) {
	return filePath.startsWith("src/") && (filePath.endsWith(".ts") || filePath.endsWith(".tsx"));
}
