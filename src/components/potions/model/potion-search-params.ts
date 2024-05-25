import { Difficulty } from "./potion-difficulty";
import { PotionSearchOrder } from "./potion-search-order";

export interface PotionSearchParams {
    orderBy?: PotionSearchOrder;
    difficulty?: Difficulty;
    query?: string;
    limit: number;
    offset: number;
  }