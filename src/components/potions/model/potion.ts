import { Difficulty } from "./potion-difficulty";

export interface Potion {
    name: string;
    potionId: string;
    characteristics?: string;
    difficulty?: Difficulty;
    effect?: string;
    image?: string;
    ingredients?: string[];
    inventors?: string;
    manufacturers?: string;
    side_effects?: string;
    time: string;
    wiki: string;
  }
  