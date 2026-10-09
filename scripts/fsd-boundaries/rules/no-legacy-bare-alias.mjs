import { FORBIDDEN_BARE_FSD_ALIAS_PREFIXES } from "../constants.mjs";

export function noLegacyBareAliasRule({ relativePath, importPath, line }) {
	for (const bareFsdPrefix of FORBIDDEN_BARE_FSD_ALIAS_PREFIXES) {
		if (importPath.startsWith(bareFsdPrefix)) {
			return [
				{
					rule: "no-legacy-bare-alias",
					file: relativePath,
					line,
					importPath,
					message: `Forbidden bare FSD alias import "${importPath}". Use "@/..." alias.`,
				},
			];
		}
	}

	return [];
}
