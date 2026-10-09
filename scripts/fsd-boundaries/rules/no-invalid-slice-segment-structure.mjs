import { DOMAIN_GROUPED_SLICED_LAYERS, FSD_SEGMENTS, SLICED_FSD_LAYERS, SPECIAL_FSD_SEGMENT_PREFIX, isAllowedSlicedSegment } from "../constants.mjs";

const ALLOWED_SLICE_ROOT_FILES = new Set(["index.ts", "index.tsx"]);

export function noInvalidSliceSegmentStructureRule({ relativePath }) {
	const parts = relativePath.split("/");
	if (parts[0] !== "src") {
		return [];
	}

	const layer = parts[1];
	if (!SLICED_FSD_LAYERS.has(layer)) {
		return [];
	}

	const layerParts = parts.slice(2);
	if (layerParts.length === 0) {
		return [];
	}

	const useDomainGrouping = DOMAIN_GROUPED_SLICED_LAYERS.has(layer) && layerParts.length >= 3 && !isAllowedSlicedSegment(layerParts[1]);
	const slice = useDomainGrouping ? layerParts[1] : layerParts[0];
	if (!slice) {
		return [];
	}

	const afterSlice = useDomainGrouping ? layerParts.slice(2) : layerParts.slice(1);
	if (afterSlice.length === 0) {
		return [];
	}

	if (afterSlice.length === 1) {
		const filename = afterSlice[0];
		if (ALLOWED_SLICE_ROOT_FILES.has(filename)) {
			return [];
		}

		return [
			{
				rule: "no-invalid-slice-segment-structure",
				file: relativePath,
				line: 1,
				importPath: "",
				message: `Sliced layer file must be inside an allowed segment (${Array.from(FSD_SEGMENTS).join(", ")}), or be a slice root index file.`,
			},
		];
	}

	const segment = afterSlice[0];
	if (!isAllowedSlicedSegment(segment)) {
		return [
			{
				rule: "no-invalid-slice-segment-structure",
				file: relativePath,
				line: 1,
				importPath: "",
				message: `Invalid segment "${segment}" in sliced layer. Allowed segments: ${Array.from(FSD_SEGMENTS).join(", ")}, or "${SPECIAL_FSD_SEGMENT_PREFIX}*".`,
			},
		];
	}

	if (afterSlice.length > 2) {
		return [
			{
				rule: "no-invalid-slice-segment-structure",
				file: relativePath,
				line: 1,
				importPath: "",
				message: `Deeper structure under segment "${segment}" is forbidden. Use src/${layer}/${useDomainGrouping ? `<domain>/` : ""}${slice}/${segment}/<file>.`,
			},
		];
	}

	return [];
}
