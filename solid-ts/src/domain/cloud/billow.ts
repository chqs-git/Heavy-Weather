export class Billow {
    resolution: number
    worleySeed: string
    numCells: number
    octaves: number
    persistence: number
    expanseSeed: string
    decay: number
    numberOfIslands: number

    constructor(
        resolution: number,
        worleySeed: string, 
        numCells: number,
        octaves: number,
        persistence: number,
        expanseSeed: string,
        decay: number, 
        cloudIslandChance: number
        ) {
        this.resolution = resolution;
        this.worleySeed = worleySeed;
        this.numCells = numCells;
        this.octaves = numCells;
        this.persistence = persistence;
        this.expanseSeed = expanseSeed;
        this.decay = decay;
        this.numberOfIslands = cloudIslandChance;
    }

    static default(): Billow {
        return new Billow(
            125,
            "default",
            2,
            3,
            0.75,
            "default",
            0.985,
            10
        )
    }
}