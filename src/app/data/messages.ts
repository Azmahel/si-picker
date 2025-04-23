import { Expansion } from "./spirit.module";

export interface Messages {
   readonly expansionNames: {[key: string] : string}
}

export const messages: Messages = {
    expansionNames: {
        [Expansion.BASE] : "Spirit Island",
        [Expansion.BRANCH_CLAW] : "Branch and Claw",
        [Expansion.JAGGED_EARTH] : "Jagged Earth" ,
        [Expansion.FEATHER_FLAME] : "Feather and Flame",
        [Expansion.HORIZONS] : "Horizons of Spirit Island" ,
        [Expansion.NATURE_INCARNATE] : "Nature Incarnate" ,
        [Expansion.APOCRYPHA] : "Apocrypha" ,
    }
}
