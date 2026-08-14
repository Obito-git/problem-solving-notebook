import { type Site, type Metadata, type Socials, SitePage } from "@types";


export const SITE: Site = {
    name: "Problem-solving notes",
    email: "antonmyroshnychenko@gmail.com",
};

export const PAGE_METADATA: Record<SitePage, Metadata> = {
    [SitePage.HOME]: {
        title: "Problem-solving notes",
        description: "LeetCode and Advent of Code problem-solving notes.",
        url: "/",
    },
    [SitePage.ABOUT]: {
        title: "About",
        description: "About this LeetCode solutions notebook.",
        url: "/about",
    },
    [SitePage.LEETCODE]: {
        title: "LeetCode Solutions",
        description: "My LeetCode solutions.",
        url: "/leetcode",
    },
    [SitePage.ADVENT]: {
        title: "Advent Challenges",
        description: "My Rust notes for Advent of Code puzzles.",
        url: "/advent",
    },
};

export const SOCIALS: Socials = [
    {
        name: "github",
        href: "https://github.com/Obito-git"
    },
    {
        name: "linkedin",
        href: "https://www.linkedin.com/in/amyroshn/",
    }
];

export enum ContentCollection {
    LEETCODE = "leetcode",
    ADVENT = "advent",
}
