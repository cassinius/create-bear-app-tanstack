import { atom } from "jotai";

export const countAtom = atom(-42);

export const countTwiceAtom = atom((get) => get(countAtom) * 2);
