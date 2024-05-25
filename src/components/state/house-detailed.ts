export interface HouseDetailed {
    houseId: string,
    name: string,
    commonRoom: string,
    image: string,
    points: number,
    houseColors: string,
    founder: string,
    animal: string,
    element: string,
    ghost: string,
    heads: HouseHead,
    traits: string[],
}

export interface HouseHead {
    houseHeads: string[]
}