import { EFsdLayer } from "../constants.mjs";

export function noPageDirectFileImportRule({ sourceMeta, relativePath, importPath, line }) {
	if (!importPath.startsWith(`@/${EFsdLayer.pages}/`)) {
		return [];
	}

	const parts = importPath.slice(2).split("/");
	if (parts.length <= 2) {
		return [];
	}

	const targetSlice = parts[1];
	const isInsideSamePageSlice = sourceMeta?.isSlicedLayer && sourceMeta.layer === EFsdLayer.pages && sourceMeta.slice === targetSlice;

	return [
		{
			rule: "no-page-direct-file-import",
			file: relativePath,
			line,
			importPath,
			message: isInsideSamePageSlice
				? `Page internal absolute import "${importPath}" is forbidden. Use relative imports inside the same page slice.`
				: `Page internal import "${importPath}" is forbidden. Import via page public API "@/pages/${targetSlice}".`,
		},
	];
}
