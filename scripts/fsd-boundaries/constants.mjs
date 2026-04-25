import path from "node:path";

export const PROJECT_ROOT = process.cwd();
export const SRC_ROOT = path.join(PROJECT_ROOT, "src");
export const ALLOWLIST_PATH = path.join(PROJECT_ROOT, "scripts", "fsd-boundaries-allowlist.json");

export const EFsdLayer = Object.freeze({
	app: "app",
	pages: "pages",
	widgets: "widgets",
	features: "features",
	entities: "entities",
	shared: "shared",
});

export const FSD_LAYERS = new Set(Object.values(EFsdLayer));
export const SLICED_FSD_LAYERS = new Set([EFsdLayer.pages, EFsdLayer.features, EFsdLayer.entities, EFsdLayer.widgets]);
export const DOMAIN_GROUPED_SLICED_LAYERS = new Set([EFsdLayer.features, EFsdLayer.widgets]);
export const FSD_SEGMENTS = new Set(["ui", "model", "lib", "api", "config", "types", "constants"]);
export const SPECIAL_FSD_SEGMENT_PREFIX = "@";

export function isSpecialSlicedSegment(segment) {
	return typeof segment === "string" && segment.startsWith(SPECIAL_FSD_SEGMENT_PREFIX);
}

export function isAllowedSlicedSegment(segment) {
	return typeof segment === "string" && (FSD_SEGMENTS.has(segment) || isSpecialSlicedSegment(segment));
}

export const FORBIDDEN_BARE_FSD_ALIAS_PREFIXES = ["app/", "pages/", "widgets/", "features/", "entities/", "shared/"];

export const IMPORT_REGEX = /(?:^|\n)\s*(?:import|export)\s+(?:type\s+)?[\s\S]*?\sfrom\s+["']([^"']+)["']/g;
export const SIDE_EFFECT_IMPORT_REGEX = /(?:^|\n)\s*import\s+["']([^"']+)["']/g;
