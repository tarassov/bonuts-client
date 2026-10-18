import * as R from "ramda";

type NullGuard = <T>(value: T | null | undefined | void) => value is null | undefined | void;

/**
 * @param { any } incomingValue
 * @returns { boolean } result
 * @description If incomingValue is equal {} | [] | '' | null | undefined return true
 */
export const isBlank = R.either(R.isNil, R.isEmpty) as NullGuard;
