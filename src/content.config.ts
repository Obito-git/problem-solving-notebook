import { defineCollection, type CollectionEntry } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { ProblemCategory, ProblemDifficulty, ProblemSubCategory } from "@const/leetcode";
import type { AdventCardEntry, ProblemCardEntry } from "@types";
import type { ContentCollection } from "@const/global";

const leetcode = defineCollection({
  loader: glob({
    base: "./src/content/leetcode",
    pattern: "**/*.md",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ""),
  }),
  schema: z.object({
    num: z.number(),
    title: z.string(),
    category: z.enum(ProblemCategory),
    subcategories: z.array(z.enum(ProblemSubCategory)),
    difficulty: z.enum(ProblemDifficulty),
    url: z.url(),
    draft: z.boolean().optional(),
  }),
});

const advent = defineCollection({
  loader: glob({
    base: "./src/content/advent",
    pattern: "**/*.md",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    year: z.number().int().min(2015),
    day: z.number().int().min(1).max(25),
    title: z.string(),
    puzzleUrl: z.url(),
    draft: z.boolean().optional(),
  }),
});

export function mapToProblemCardEntry(
  entry: CollectionEntry<ContentCollection.LEETCODE>,
): ProblemCardEntry {
  return {
    title: `${entry.data.num}. ${entry.data.title}`,
    url: `/${entry.collection}/${entry.id}`,
    difficulty: entry.data.difficulty,
  };
}

export function mapToAdventCardEntry(
  entry: CollectionEntry<ContentCollection.ADVENT>,
): AdventCardEntry {
  return {
    day: entry.data.day,
    title: entry.data.title,
    url: `/${entry.collection}/${entry.data.year}/${entry.data.day}`,
  };
}

export const collections = { leetcode, advent };
