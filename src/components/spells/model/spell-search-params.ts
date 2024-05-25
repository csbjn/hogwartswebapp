import { SpellCategory } from "./spell-category";
import { SpellSearchOrder } from "./spell-search-order";

export class SpellSearchParams {
    type = 'SPELL';
    category?: SpellCategory;
    light?: string;
    orderBy?: SpellSearchOrder = SpellSearchOrder.NAME_ASC;
  }