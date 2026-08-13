import { ProblemCategory, ProblemDifficulty, ProblemSubCategory } from "@const/leetcode";
import type { AdventCardEntry, ProblemCardEntry } from "@types";
import { defineCollection, z, type CollectionEntry } from "astro:content";
import type { ContentCollection } from "@const/global";

const leetcode = defineCollection({
  type: "content",
  schema: z.object({
    num: z.number(),
    title: z.string(),
    category: z.nativeEnum(ProblemCategory),
    subcategories: z.array(z.nativeEnum(ProblemSubCategory)),
    difficulty: z.nativeEnum(ProblemDifficulty),
    url: z.string().url(),
    draft: z.boolean().optional()
  }),
});

const advent = defineCollection({
  type: "content",
  schema: z.object({
    year: z.number().int().min(2015),
    day: z.number().int().min(1).max(25),
    title: z.string(),
    puzzleUrl: z.string().url(),
    draft: z.boolean().optional()
  }),
});

export function mapToProblemCardEntry(schema: CollectionEntry<ContentCollection.LEETCODE>): ProblemCardEntry {
  return {
    title: `${schema.data.num}. ${schema.data.title}`,
    url: `/${schema.collection}/${schema.slug}`,
    difficulty: schema.data.difficulty
  };
}

export function mapToAdventCardEntry(schema: CollectionEntry<ContentCollection.ADVENT>): AdventCardEntry {
  return {
    day: schema.data.day,
    title: schema.data.title,
    url: `/${schema.collection}/${schema.data.year}/${schema.data.day}`
  };
}

export const collections = { leetcode: leetcode, advent: advent };
