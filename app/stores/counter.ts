import { atom } from "xoid";

export const $count = atom(-42);

export const $doubleCount = atom((get) => get($count) * 2);
