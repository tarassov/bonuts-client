import type { ComponentPropsWithoutRef, FC } from "react";

type TSectionProps = ComponentPropsWithoutRef<"section">;
type TSectionHeaderProps = ComponentPropsWithoutRef<"header">;

/** Generic semantic section wrapper for independently labelled page content. */
export const BntSection: FC<TSectionProps> = (props) => <section {...props} />;

/** Generic semantic header wrapper for a section or page heading. */
export const BntSectionHeader: FC<TSectionHeaderProps> = (props) => <header {...props} />;
