import type { ContentCollection } from "@const/global";
import { difficultyOrder } from "@const/leetcode";
import type { CollectionEntry } from "astro:content";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortProblemsByDifficulty(
  problems: CollectionEntry<typeof ContentCollection.LEETCODE>[],
): CollectionEntry<typeof ContentCollection.LEETCODE>[] {
  return problems.sort((a, b) => {
    const aDiff: number = difficultyOrder[a.data.difficulty] ?? 99;
    const bDiff: number = difficultyOrder[b.data.difficulty] ?? 99;
    return aDiff - bDiff;
  });
}
