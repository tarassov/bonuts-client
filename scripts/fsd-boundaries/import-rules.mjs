import { DOMAIN_GROUPED_SLICED_LAYERS, EFsdLayer, FSD_LAYERS, IMPORT_REGEX, SIDE_EFFECT_IMPORT_REGEX, SLICED_FSD_LAYERS, isAllowedSlicedSegment } from "./constants.mjs";
import { toPosix } from "./path-utils.mjs";

const TARGET_ALIAS_LAYERS = new Set([EFsdLayer.pages, EFsdLayer.features, EFsdLayer.entities, EFsdLayer.widgets, EFsdLayer.shared]);

function buildSliceKey(domain, slice) {
	return domain ? `${domain}/${slice}` : slice;
}

/**
 * Parses parts after layer for sliced layers.
 * Supports:
 * - <slice>/<segment>/...
 * - <domain>/<slice>/<segment>/... (for domain-grouped layers)
 */
function parseSlicedLayerParts(layer, layerParts) {
	if (layerParts.length === 0) {
		return {
			domain: "",
			slice: "",
			sliceKey: "",
			segment: "",
			rest: "",
		};
	}

	const useDomainGrouping = DOMAIN_GROUPED_SLICED_LAYERS.has(layer) && layerParts.length >= 3 && !isAllowedSlicedSegment(layerParts[1]);
	if (useDomainGrouping) {
		const [domain, slice, segment, ...restParts] = layerParts;
		return {
			domain,
			slice,
			sliceKey: buildSliceKey(domain, slice),
			segment,
			rest: restParts.join("/"),
		};
	}

	const [slice, segment, ...restParts] = layerParts;
	return {
		domain: "",
		slice,
		sliceKey: buildSliceKey("", slice),
		segment,
		rest: restParts.join("/"),
	};
}

export function parseSourceMeta(filePath) {
	const normalized = toPosix(filePath);
	const parts = normalized.split("/");
	if (parts[0] !== "src") {
		return null;
	}

	const layer = parts[1];
	if (!FSD_LAYERS.has(layer)) {
		return null;
	}

	const isSlicedLayer = SLICED_FSD_LAYERS.has(layer);
	if (!isSlicedLayer) {
		return { layer, domain: "", slice: "", sliceKey: "", segment: "", isSlicedLayer: false };
	}

	const parsed = parseSlicedLayerParts(layer, parts.slice(2));

	return {
		layer,
		domain: parsed.domain,
		slice: parsed.slice,
		sliceKey: parsed.sliceKey,
		segment: isAllowedSlicedSegment(parsed.segment) ? parsed.segment : "",
		isSlicedLayer: true,
	};
}

export function getLineByIndex(content, index) {
	let line = 1;
	for (let i = 0; i < index; i += 1) {
		if (content[i] === "\n") {
			line += 1;
		}
	}
	return line;
}

export function extractImportSpecifiers(content) {
	const imports = [];
	for (const regex of [IMPORT_REGEX, SIDE_EFFECT_IMPORT_REGEX]) {
		regex.lastIndex = 0;
		let match = regex.exec(content);
		while (match) {
			imports.push({
				importPath: match[1],
				index: match.index,
			});
			match = regex.exec(content);
		}
	}
	return imports;
}

export function parseTargetAlias(importPath) {
	if (!importPath.startsWith("@/")) {
		return null;
	}

	const parts = importPath.slice(2).split("/");
	if (parts.length < 3) {
		return null;
	}

	const [layer, ...layerParts] = parts;
	if (!TARGET_ALIAS_LAYERS.has(layer)) {
		return null;
	}

	const parsed = SLICED_FSD_LAYERS.has(layer)
		? parseSlicedLayerParts(layer, layerParts)
		: {
				domain: "",
				slice: layerParts[0] ?? "",
				sliceKey: layerParts[0] ?? "",
				segment: layerParts[1] ?? "",
				rest: layerParts.slice(2).join("/"),
			};

	return {
		layer,
		domain: parsed.domain,
		slice: parsed.slice,
		sliceKey: parsed.sliceKey,
		segment: parsed.segment,
		rest: parsed.rest,
	};
}
