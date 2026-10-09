import * as R from "ramda";

import { isBlank } from "./is-blank";

type NonNullGuard = <T>(value: T | {} | null | undefined | void) => value is NonNullable<T>;

/**
 * @param { any } incomingValue
 * @returns { boolean } result
 * @description If incomingValue is equal {} | [] | '' | null | undefined return false
 */
export const present = R.complement(isBlank) as NonNullGuard;
