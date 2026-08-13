import type { ProblemDifficulty } from "@const/leetcode";

export type Site = {
    name: string;
    email: string;
};

export enum SitePage {
    HOME = "home",
    ABOUT = "about",
    LEETCODE = "leetcode",
    ADVENT = "advent",
}

export type Metadata = {
    title: string;
    description: string;
    url: string;
};

export type Socials = {
    name: string;
    href: string;
}[];

export interface ProblemCardEntry {
    title: string;
    difficulty: ProblemDifficulty;
    url: string;
}

export interface AdventCardEntry {
    day: number;
    title: string;
    url: string;
}
